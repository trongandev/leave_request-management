import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSystemSettingDto } from './dto/create-system-setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemSetting } from './system-setting.schema';

@Injectable()
export class SystemSettingService implements OnModuleInit {
  constructor(
    @InjectModel(SystemSetting.name)
    private readonly systemSettingModel: Model<SystemSetting>,
  ) {}

  async onModuleInit() {
    // Bootstrap default policy value so leave calculations always have a fallback.
    await this.systemSettingModel.findOneAndUpdate(
      { key: 'LEAVE_BASE_PER_YEAR' },
      {
        $setOnInsert: {
          key: 'LEAVE_BASE_PER_YEAR',
          value: 12,
          description: 'So ngay phep co ban moi nam',
        },
      },
      { upsert: true, new: true },
    );
  }

  create(createSystemSettingDto: CreateSystemSettingDto) {
    return this.systemSettingModel.create({
      ...createSystemSettingDto,
      key: createSystemSettingDto.key.toUpperCase(),
    });
  }

  findAll() {
    return this.systemSettingModel.find().sort({ key: 1 }).lean().exec();
  }

  findOne(id: string) {
    return this.systemSettingModel.findById(id).lean().exec();
  }

  findOneByKey(key: string) {
    return this.systemSettingModel
      .findOne({ key: key.toUpperCase() })
      .lean()
      .exec();
  }

  update(id: string, updateSystemSettingDto: UpdateSystemSettingDto) {
    return this.systemSettingModel
      .findByIdAndUpdate(id, updateSystemSettingDto, { new: true })
      .lean()
      .exec();
  }

  updateByKey(key: string, updateSystemSettingDto: UpdateSystemSettingDto) {
    // Upsert by key keeps config management idempotent from admin UI/API.
    return this.systemSettingModel
      .findOneAndUpdate(
        { key: key.toUpperCase() },
        {
          ...updateSystemSettingDto,
          key: key.toUpperCase(),
        },
        { new: true, upsert: true },
      )
      .lean()
      .exec();
  }

  async getLeaveBasePerYear() {
    // Single source of truth used by leave-balance calculation service.
    const setting = await this.findOneByKey('LEAVE_BASE_PER_YEAR');
    const parsed = Number(setting?.value ?? 12);

    if (!Number.isFinite(parsed) || parsed < 0) {
      return 12;
    }

    return Number(parsed.toFixed(2));
  }

  remove(id: string) {
    return this.systemSettingModel.findByIdAndDelete(id).lean().exec();
  }
}
