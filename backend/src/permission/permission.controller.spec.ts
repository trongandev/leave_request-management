import { Test, TestingModule } from '@nestjs/testing';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

const mockPermissionService = {
  syncPermissions: jest.fn(),
};

describe('PermissionController', () => {
  let controller: PermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        {
          provide: PermissionService,
          useValue: mockPermissionService,
        },
      ],
    }).compile();

    controller = module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
