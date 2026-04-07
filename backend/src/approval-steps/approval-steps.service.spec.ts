import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApprovalStepsService } from './approval-steps.service';
import { ApprovalStep } from './approval-steps.schema';
import { DelegationsService } from '../delegations/delegations.service';
import { Request } from '../requests/requests.schema';
import { LeaveBalance } from '../leave-balances/leave-balances.schema';
import { FormTemplate } from '../form-template/form-template.schema';
import { Counter } from '../counters/counters.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { ApprovalStepsFlowLogService } from '../approval-steps-flow-log/approval-steps-flow-log.service';

describe('ApprovalStepsService', () => {
  let service: ApprovalStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApprovalStepsService,
        {
          provide: getModelToken(ApprovalStep.name),
          useValue: {},
        },
        {
          provide: getModelToken(Request.name),
          useValue: {},
        },
        {
          provide: getModelToken(Counter.name),
          useValue: {},
        },
        {
          provide: getModelToken(LeaveBalance.name),
          useValue: {},
        },
        {
          provide: getModelToken(FormTemplate.name),
          useValue: {},
        },
        {
          provide: DelegationsService,
          useValue: {
            findDelegatorsByDelegatee: jest.fn().mockResolvedValue([]),
            canActOnBehalf: jest.fn().mockResolvedValue(false),
          },
        },
        {
          provide: NotificationsService,
          useValue: {
            notifyRequestAssigned: jest.fn(),
            notifyStepApproved: jest.fn(),
            notifyRequestRejected: jest.fn(),
            notifyRequestReturned: jest.fn(),
            notifyRequestApproved: jest.fn(),
          },
        },
        {
          provide: ApprovalStepsFlowLogService,
          useValue: {
            markApproved: jest.fn(),
            markApprovedByFlowLogId: jest.fn(),
            markRejected: jest.fn(),
            markRejectedByFlowLogId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApprovalStepsService>(ApprovalStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
