import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { UsersService } from '@/users/users.service';

const mockUsersService = {
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
