import { Test, TestingModule } from '@nestjs/testing';
import { SystemSettingController } from './system-setting.controller';
import { SystemSettingService } from './system-setting.service';

describe('SystemSettingController', () => {
  let controller: SystemSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemSettingController],
      providers: [SystemSettingService],
    }).compile();

    controller = module.get<SystemSettingController>(SystemSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
