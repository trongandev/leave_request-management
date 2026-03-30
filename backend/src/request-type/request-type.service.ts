import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestTypeDto } from './dto/create-request-type.dto';
import { UpdateRequestTypeDto } from './dto/update-request-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestType } from './request-type.schema';
import { Counter } from '../counters/counters.schema';
import { PaginationDto } from '../common/dto/pagination.dto';
import { paginate } from '../common/utils/pagination.util';

@Injectable()
export class RequestTypeService {
  constructor(
    @InjectModel(RequestType.name)
    private readonly requestTypeModel: Model<RequestType>,
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
  ) {}

  private async getNextRequestTypeId() {
    const maxDoc = await this.requestTypeModel
      .findOne()
      .sort({ _id: -1 })
      .select('_id')
      .lean<{ _id?: number }>()
      .exec();

    const maxExistingId = Number(maxDoc?._id ?? 0);

    // Đảm bảo counter luôn >= max _id hiện có (đặc biệt sau seed).
    const syncedCounter = await this.counterModel
      .findOneAndUpdate(
        { _id: 'request_type' },
        { $max: { seq: maxExistingId } },
        { upsert: true, new: true },
      )
      .select('seq')
      .lean<{ seq?: number }>()
      .exec();

    const nextId = Number(syncedCounter?.seq ?? maxExistingId) + 1;

    await this.counterModel.updateOne(
      { _id: 'request_type' },
      { $set: { seq: nextId } },
      { upsert: true },
    );

    return nextId;
  }

  async create(createRequestTypeDto: CreateRequestTypeDto) {
    const normalizedCode = createRequestTypeDto.code.trim().toUpperCase();

    const exists = await this.requestTypeModel
      .findOne({ code: normalizedCode })
      .select('_id')
      .lean()
      .exec();

    if (exists) {
      throw new ConflictException('Request type code already exists');
    }

    const nextId = await this.getNextRequestTypeId();

    return this.requestTypeModel.create({
      _id: nextId,
      ...createRequestTypeDto,
      code: normalizedCode,
      desc: createRequestTypeDto.desc?.trim() ?? '',
    });
  }

  findAll(paginationDto: PaginationDto) {
    return paginate(
      this.requestTypeModel,
      paginationDto,
      {},
      { sort: { _id: 1 } },
    );
  }

  async findOne(id: number) {
    const item = await this.requestTypeModel.findById(id).lean().exec();
    if (!item) {
      throw new NotFoundException('Request type not found');
    }
    return item;
  }

  async update(id: number, updateRequestTypeDto: UpdateRequestTypeDto) {
    const payload: Partial<UpdateRequestTypeDto> = {
      ...updateRequestTypeDto,
    };

    if (typeof updateRequestTypeDto.code === 'string') {
      const normalizedCode = updateRequestTypeDto.code.trim().toUpperCase();
      const duplicate = await this.requestTypeModel
        .findOne({ code: normalizedCode, _id: { $ne: id } })
        .select('_id')
        .lean()
        .exec();

      if (duplicate) {
        throw new ConflictException('Request type code already exists');
      }
      payload.code = normalizedCode;
    }

    if (typeof updateRequestTypeDto.desc === 'string') {
      payload.desc = updateRequestTypeDto.desc.trim();
    }

    const updated = await this.requestTypeModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Request type not found');
    }

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.requestTypeModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Request type not found');
    }
    return {
      message: 'Request type deleted successfully',
      id,
    };
  }
}
