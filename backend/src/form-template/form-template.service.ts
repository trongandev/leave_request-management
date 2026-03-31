import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFormTemplateDto } from './dto/create-form-template.dto';
import { UpdateFormTemplateDto } from './dto/update-form-template.dto';
import { FormTemplate } from './form-template.schema';
import { paginate } from 'src/common/utils/pagination.util';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class FormTemplateService {
  constructor(
    @InjectModel(FormTemplate.name)
    private formTemplateModel: Model<FormTemplate>,
  ) {}

  async create(createFormTemplateDto: CreateFormTemplateDto, user: any) {
    const existingTemplate = await this.formTemplateModel
      .findOne({ code: createFormTemplateDto.code })
      .exec();
    if (existingTemplate) {
      throw new Error('Form template with this code already exists');
    }
    const createdTemplate = new this.formTemplateModel({
      ...createFormTemplateDto,
      userId: user._id,
    });
    return createdTemplate.save();
  }

  async findAll(paginationDto: PaginationDto) {
    return paginate(
      this.formTemplateModel,
      paginationDto,
      {},
      {
        populate: {
          path: 'userId',
          select: 'empId fullName code email',
        },
        select: '-fields -__v',
      },
    );
  }

  async findOne(id: string) {
    return this.formTemplateModel.findById(id).exec();
  }

  async update(id: string, updateFormTemplateDto: UpdateFormTemplateDto) {
    return this.formTemplateModel
      .findByIdAndUpdate(id, updateFormTemplateDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.formTemplateModel.findByIdAndDelete(id).exec();
  }
}
