import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
jest.mock('../users/users.service', () => ({
  UsersService: class UsersService {},
}));
import { RequestsService } from './requests.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { ApprovalOrchestratorService } from '../approval-steps/policies/approval-orchestrator.service';
import { ApprovalStepsService } from '../approval-steps/approval-steps.service';
import { Request } from './requests.schema';
import { LeaveBalance } from '../leave-balances/leave-balances.schema';

describe('RequestsService', () => {
  let service: RequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: getModelToken(Request.name),
          useValue: {},
        },
        {
          provide: getModelToken(LeaveBalance.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: ApprovalOrchestratorService,
          useValue: {
            planApprovalSteps: jest.fn(),
            transformToPersistableSteps: jest.fn(),
          },
        },
        {
          provide: ApprovalStepsService,
          useValue: {
            createBatch: jest.fn(),
            deleteByRequestId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
