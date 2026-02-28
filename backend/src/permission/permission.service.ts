import { Injectable } from '@nestjs/common';
import { PermissionDoc } from './permission.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PERMISSIONS_METADATA } from '@/enum/permission.enum';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(PermissionDoc.name)
    private permissionModel: Model<PermissionDoc>,
  ) {}

  async syncPermissions() {
    const operations = PERMISSIONS_METADATA.map((item) => ({
      updateOne: {
        filter: { code: item.code },
        update: {
          code: item.code,
          description: item.description,
          module: item.module, // Lưu thêm cả module để sau này phân nhóm trên UI
        },
        upsert: true,
      },
    }));
    const result = await this.permissionModel.bulkWrite(operations);

    // Dọn dẹp các quyền cũ không còn trong code
    const validCodes = PERMISSIONS_METADATA.map((p) => p.code);
    await this.permissionModel.deleteMany({ code: { $nin: validCodes } });

    return {
      message: 'Đồng bộ quyền thành công',
      details: result,
    };
  }
}
