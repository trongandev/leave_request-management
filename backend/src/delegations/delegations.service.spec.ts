import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DelegationsService } from './delegations.service';
import { Delegation } from './delegations.schema';
import { User } from '../users/users.schema';

describe('DelegationsService', () => {
  let service: DelegationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DelegationsService,
        {
          provide: getModelToken(Delegation.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DelegationsService>(DelegationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
