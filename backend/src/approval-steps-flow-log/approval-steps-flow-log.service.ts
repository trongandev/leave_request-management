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
        postition: params.requesterPosition ?? 'System',
        reason,
        performer: params.requesterName || 'System',
        status: hasApprovalSteps
          ? FlowLogStatus.PROCESSING
          : FlowLogStatus.APPROVED,
        signedAt: nowIso,
      },
      ...sortedApprovalSteps.map((step) => ({
        order: step.order,
        label: step.label,
        postition: step.postition || 'System',
        reason,
        performer: step.performer || 'System',
        status: FlowLogStatus.PROCESSING,
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
      flowLog.steps[currentIndex].status = FlowLogStatus.APPROVED;
      if (performerName) {
        flowLog.steps[currentIndex].performer = performerName;
      }
    }

    const nextOrder = flowLog.currentStepOrder + 1;

    const nextIndex = flowLog.steps.findIndex(
      (step) => step.order === nextOrder,
    );

    if (nextIndex >= 0) {
      flowLog.steps[nextIndex].status = FlowLogStatus.PROCESSING;
      flowLog.currentStepOrder = nextOrder;
    } else {
      // Last approval is complete; add final "Hoàn tất" (Completed) step automatically
      const maxOrder = Math.max(...flowLog.steps.map((s) => s.order), 0);
      const finalStepOrder = maxOrder + 1;
      const completedStep = {
        order: finalStepOrder,
        label: 'Hoàn tất',
        postition: 'System',
        reason: '',
        performer: performerName || 'System',
        status: FlowLogStatus.APPROVED,
        signedAt: nowIso,
      };
      flowLog.steps.push(completedStep);
      flowLog.currentStepOrder = finalStepOrder;
      flowLog.status = FlowLogStatus.APPROVED;
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
      currentStep.status = FlowLogStatus.REJECTED;
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

    if (currentStep) {
      if (!currentStep.signedAt) {
        currentStep.signedAt = new Date().toISOString();
      }
      currentStep.status = FlowLogStatus.CANCELLED;
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
