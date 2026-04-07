import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalStepsFlowLogController } from './approval-steps-flow-log.controller';
import { ApprovalStepsFlowLogService } from './approval-steps-flow-log.service';

describe('ApprovalStepsFlowLogController', () => {
  let controller: ApprovalStepsFlowLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalStepsFlowLogController],
      providers: [
        {
          provide: ApprovalStepsFlowLogService,
          useValue: {
            requireByRequestId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApprovalStepsFlowLogController>(ApprovalStepsFlowLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
