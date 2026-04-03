import { Test, TestingModule } from '@nestjs/testing';
import { DelegationsController } from './delegations.controller';
import { DelegationsService } from './delegations.service';

describe('DelegationsController', () => {
  let controller: DelegationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelegationsController],
      providers: [
        {
          provide: DelegationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DelegationsController>(DelegationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
