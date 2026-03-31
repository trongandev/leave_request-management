import { Module } from '@nestjs/common';
import { FormTemplateService } from './form-template.service';
import { FormTemplateController } from './form-template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormTemplate, FormTemplateSchema } from './form-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FormTemplate.name, schema: FormTemplateSchema },
    ]),
  ],
  controllers: [FormTemplateController],
  providers: [FormTemplateService],
  exports: [FormTemplateService],
})
export class FormTemplateModule {}
