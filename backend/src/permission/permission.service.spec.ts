import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PermissionService } from './permission.service';
import { PermissionDoc } from './permission.schema';

const mockPermissionModel = {
  bulkWrite: jest.fn(),
  deleteMany: jest.fn(),
};

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getModelToken(PermissionDoc.name),
          useValue: mockPermissionModel,
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
