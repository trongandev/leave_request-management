import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './roles.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}
  create(createRoleDto: CreateRoleDto) {
    const newRole = new this.roleModel(createRoleDto);
    const saveRole = newRole.save();
    return saveRole;
  }

  findAll() {
    return this.roleModel.find().exec();
  }

  findOne(id: number) {
    return this.roleModel.findById(id).exec();
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.roleModel.findByIdAndDelete(id).exec();
  }
}
