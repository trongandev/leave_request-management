import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApprovalStepsFlowLogService } from './approval-steps-flow-log.service';
import { ApprovalStepsFlowLog } from './approval-steps-flow-log.schema';

describe('ApprovalStepsFlowLogService', () => {
  let service: ApprovalStepsFlowLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApprovalStepsFlowLogService,
        {
          provide: getModelToken(ApprovalStepsFlowLog.name),
          useValue: {
            findOneAndUpdate: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApprovalStepsFlowLogService>(ApprovalStepsFlowLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
