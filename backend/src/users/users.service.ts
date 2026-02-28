import { Get, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const saveUser = newUser.save();
    return saveUser;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(paginationDto: PaginationDto) {
    return paginate(this.userModel, paginationDto);
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
