import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalStepsController } from './approval-steps.controller';
import { ApprovalStepsService } from './approval-steps.service';

describe('ApprovalStepsController', () => {
  let controller: ApprovalStepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalStepsController],
      providers: [
        {
          provide: ApprovalStepsService,
          useValue: {
            findAll: jest.fn(),
            findPendingForApprover: jest.fn(),
            findByRequestId: jest.fn(),
            findById: jest.fn(),
            approve: jest.fn(),
            reject: jest.fn(),
            returnStep: jest.fn(),
            delegate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApprovalStepsController>(ApprovalStepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
