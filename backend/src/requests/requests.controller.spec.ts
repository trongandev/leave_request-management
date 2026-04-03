import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
jest.mock('../users/users.service', () => ({
  UsersService: class UsersService {},
}));
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

describe('RequestsController', () => {
  let controller: RequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        {
          provide: RequestsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            resubmitAfterReturn: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
