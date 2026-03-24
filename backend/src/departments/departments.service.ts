import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './departments.schema';
import { Model } from 'mongoose';
import { paginate } from 'src/common/utils/pagination.util';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel('Department')
    private readonly departmentModel: Model<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const createNewDepartment = new this.departmentModel(createDepartmentDto);
    return createNewDepartment.save();
  }

  findAll(paginationDto: PaginationDto) {
    return paginate(this.departmentModel, paginationDto);
  }

  findOne(id: string) {
    return this.departmentModel.findById(id);
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.departmentModel.findByIdAndDelete(id);
  }
}
