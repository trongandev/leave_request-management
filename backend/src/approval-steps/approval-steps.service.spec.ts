import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApprovalStepsService } from './approval-steps.service';
import { ApprovalStep } from './approval-steps.schema';
import { DelegationsService } from '../delegations/delegations.service';
import { Request } from '../requests/requests.schema';
import { LeaveBalance } from '../leave-balances/leave-balances.schema';
import { FormTemplate } from '../form-template/form-template.schema';

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
      ],
    }).compile();

    service = module.get<ApprovalStepsService>(ApprovalStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
