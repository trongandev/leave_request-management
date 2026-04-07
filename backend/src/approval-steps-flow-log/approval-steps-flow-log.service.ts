import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	ApprovalStepsFlowLog,
	FlowLogStatus,
	FlowLogStepStatus,
} from './approval-steps-flow-log.schema';

@Injectable()
export class ApprovalStepsFlowLogService {
	constructor(
		@InjectModel(ApprovalStepsFlowLog.name)
		private readonly flowLogModel: Model<ApprovalStepsFlowLog>,
	) {}

	async createOrResetForRequest(params: {
		requestId: string;
		requesterName: string;
		managerName: string;
		expectedDate?: Date;
	}): Promise<ApprovalStepsFlowLog> {
		// Upsert + full steps reset ensures resubmission always starts from a clean timeline.
		const now = new Date();

		return this.flowLogModel
			.findOneAndUpdate(
				{ requestId: params.requestId },
				{
					$set: {
						requestId: params.requestId,
						currentStepId: 1,
						status: FlowLogStatus.PROCESSING,
						steps: [
							{
								order: 0,
								label: 'Register Request',
								status: FlowLogStepStatus.COMPLETED,
								performer: params.requesterName,
								updatedAt: now,
							},
							{
								order: 1,
								label: 'Dept Manager Approval',
								status: FlowLogStepStatus.IN_PROGRESS,
								performer: params.managerName,
								expectedDate: params.expectedDate,
								updatedAt: now,
							},
						],
					},
				},
				{
					new: true,
					upsert: true,
					setDefaultsOnInsert: true,
				},
			)
			.exec();
	}

	async findByRequestId(requestId: string): Promise<ApprovalStepsFlowLog | null> {
		return this.flowLogModel.findOne({ requestId }).exec();
	}

	async findById(flowLogId: string): Promise<ApprovalStepsFlowLog | null> {
		return this.flowLogModel.findById(flowLogId).exec();
	}

	async markApproved(requestId: string, performerName?: string): Promise<void> {
		const flowLog = await this.flowLogModel.findOne({ requestId }).exec();
		if (!flowLog) {
			return;
		}

		await this.markApprovedFlow(flowLog, performerName);
	}

	async markApprovedByFlowLogId(
		flowLogId: string,
		performerName?: string,
	): Promise<void> {
		const flowLog = await this.flowLogModel.findById(flowLogId).exec();
		if (!flowLog) {
			return;
		}

		await this.markApprovedFlow(flowLog, performerName);
	}

	async markRejected(requestId: string, performerName?: string): Promise<void> {
		const flowLog = await this.flowLogModel.findOne({ requestId }).exec();
		if (!flowLog) {
			return;
		}

		await this.markRejectedFlow(flowLog, performerName);
	}

	async markRejectedByFlowLogId(
		flowLogId: string,
		performerName?: string,
	): Promise<void> {
		const flowLog = await this.flowLogModel.findById(flowLogId).exec();
		if (!flowLog) {
			return;
		}

		await this.markRejectedFlow(flowLog, performerName);
	}

	private async markApprovedFlow(
		flowLog: ApprovalStepsFlowLog,
		performerName?: string,
	): Promise<void> {
		// State transition: current in_progress -> completed, then move pointer to next step.

		const now = new Date();
		const currentIndex = flowLog.steps.findIndex(
			(step) => step.order === flowLog.currentStepId,
		);

		if (currentIndex >= 0) {
			flowLog.steps[currentIndex].status = FlowLogStepStatus.COMPLETED;
			flowLog.steps[currentIndex].updatedAt = now;
			if (performerName) {
				flowLog.steps[currentIndex].performer = performerName;
			}
		}

		flowLog.currentStepId += 1;

		const nextIndex = flowLog.steps.findIndex(
			(step) => step.order === flowLog.currentStepId,
		);

		if (nextIndex >= 0) {
			flowLog.steps[nextIndex].status = FlowLogStepStatus.IN_PROGRESS;
			flowLog.steps[nextIndex].updatedAt = now;
		} else {
			flowLog.status = FlowLogStatus.APPROVED;
			flowLog.currentStepId = Math.max(flowLog.currentStepId - 1, 0);
		}

		await flowLog.save();
	}

	private async markRejectedFlow(
		flowLog: ApprovalStepsFlowLog,
		performerName?: string,
	): Promise<void> {
		// State transition: mark current step failed and stop the process at aggregate status.

		const currentStep = flowLog.steps.find(
			(step) => step.order === flowLog.currentStepId,
		);

		if (currentStep) {
			currentStep.status = FlowLogStepStatus.FAILED;
			currentStep.updatedAt = new Date();
			if (performerName) {
				currentStep.performer = performerName;
			}
		}

		flowLog.status = FlowLogStatus.REJECTED;
		await flowLog.save();
	}

	async markCancelled(requestId: string): Promise<void> {
		const flowLog = await this.flowLogModel.findOne({ requestId }).exec();
		if (!flowLog) {
			return;
		}

		const currentStep = flowLog.steps.find(
			(step) => step.order === flowLog.currentStepId,
		);

		if (currentStep && currentStep.status !== FlowLogStepStatus.COMPLETED) {
			currentStep.status = FlowLogStepStatus.CANCELLED;
			currentStep.updatedAt = new Date();
		}

		flowLog.status = FlowLogStatus.CANCELLED;
		await flowLog.save();
	}

	async requireByRequestId(requestId: string): Promise<ApprovalStepsFlowLog> {
		const flowLog = await this.findByRequestId(requestId);
		if (!flowLog) {
			throw new NotFoundException(
				`Approval flow log for request ${requestId} not found`,
			);
		}

		return flowLog;
	}
}
