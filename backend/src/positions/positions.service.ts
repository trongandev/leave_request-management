import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './positions.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { paginate } from 'src/common/utils/pagination.util';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel('Position')
    private readonly positionsModel: Model<Position>,
  ) {}

  create(createPositionDto: CreatePositionDto) {
    const createNewPosition = new this.positionsModel(createPositionDto);
    return createNewPosition.save();
  }

  findAll(paginationDto: PaginationDto) {
    return paginate(this.positionsModel, paginationDto);
  }

  findOne(id: string) {
    return this.positionsModel.findById(id);
  }

  update(id: string, updatePositionDto: UpdatePositionDto) {
    return this.positionsModel.findByIdAndUpdate(id, updatePositionDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.positionsModel.findByIdAndDelete(id);
  }
}
