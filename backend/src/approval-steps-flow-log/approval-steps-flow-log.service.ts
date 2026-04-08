import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApprovalStepsFlowLog } from './approval-steps-flow-log.schema';
import { FlowLogStatus } from '../enum/flow-log-statuses.enum';

@Injectable()
export class ApprovalStepsFlowLogService {
  constructor(
    @InjectModel(ApprovalStepsFlowLog.name)
    private readonly flowLogModel: Model<ApprovalStepsFlowLog>,
  ) {}

  async createOrResetForRequest(params: {
    requestId: string;
    requesterName: string;
    requesterPosition?: string;
    reason?: string;
    approvalSteps: Array<{
      order: number;
      label: string;
      postition: string;
      performer?: string;
      signedAt?: string;
    }>;
  }): Promise<ApprovalStepsFlowLog> {
    const sortedApprovalSteps = [...params.approvalSteps].sort(
      (a, b) => a.order - b.order,
    );
    const hasApprovalSteps = sortedApprovalSteps.length > 0;
    const reason = params.reason ?? '';
    const nowIso = new Date().toISOString();

    const normalizedSteps = [
      {
        order: 0,
        label: 'Register Request',
        postition: params.requesterPosition ?? '',
        reason,
        performer: params.requesterName,
        signedAt: nowIso,
      },
      ...sortedApprovalSteps.map((step) => ({
        order: step.order,
        label: step.label,
        postition: step.postition,
        reason,
        performer: step.performer,
        signedAt: step.signedAt ?? '',
      })),
    ];

    return this.flowLogModel
      .findOneAndUpdate(
        { requestId: params.requestId },
        {
          $set: {
            requestId: params.requestId,
            currentStepOrder: hasApprovalSteps
              ? sortedApprovalSteps[0].order
              : 0,
            status: hasApprovalSteps
              ? FlowLogStatus.PROCESSING
              : FlowLogStatus.APPROVED,
            steps: normalizedSteps,
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

  async findByRequestId(
    requestId: string,
  ): Promise<ApprovalStepsFlowLog | null> {
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
    const nowIso = new Date().toISOString();
    const currentIndex = flowLog.steps.findIndex(
      (step) => step.order === flowLog.currentStepOrder,
    );

    if (currentIndex >= 0) {
      flowLog.steps[currentIndex].signedAt = nowIso;
      if (performerName) {
        flowLog.steps[currentIndex].performer = performerName;
      }
    }

    const nextOrder = flowLog.currentStepOrder + 1;

    const nextIndex = flowLog.steps.findIndex(
      (step) => step.order === nextOrder,
    );

    if (nextIndex >= 0) {
      flowLog.currentStepOrder = nextOrder;
    } else {
      flowLog.status = FlowLogStatus.APPROVED;
      flowLog.currentStepOrder = Math.max(flowLog.currentStepOrder, 0);
    }

    await flowLog.save();
  }

  private async markRejectedFlow(
    flowLog: ApprovalStepsFlowLog,
    performerName?: string,
  ): Promise<void> {
    const nowIso = new Date().toISOString();
    const currentStep = flowLog.steps.find(
      (step) => step.order === flowLog.currentStepOrder,
    );

    if (currentStep) {
      currentStep.signedAt = nowIso;
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
      (step) => step.order === flowLog.currentStepOrder,
    );

    if (currentStep && !currentStep.signedAt) {
      currentStep.signedAt = new Date().toISOString();
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
