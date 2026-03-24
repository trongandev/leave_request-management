import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty({ message: 'Tên vị trí không được để trống' })
  name: string; // Tên tiếng Anh viết tắt (VD: SWE, HR, PM)

  @IsNotEmpty({ message: 'Tên đầy đủ không được để trống' })
  fullName: string; // Tên tiếng Anh đầy đủ (VD: Software Engineer)

  @IsNotEmpty({ message: 'Level cấp bậc không được để trống' })
  level: number; // Cấp bậc từ 1-8

  @IsOptional()
  description: string; // Tên dịch qua tiếng Việt (VD: Kỹ sư phần mềm)

  @IsNotEmpty({ message: 'ID Phòng ban không được để trống' })
  departmentId: string;
}

// "name": "string", // Tên tiếng Anh viết tắt (VD: SWE, HR, PM)
// "fullName": "string", // Tên tiếng Anh đầy đủ (VD: Software Engineer)
// "level": "number", // Cấp bậc từ 1-8
// "description": "string", // Tên dịch qua tiếng Việt (VD: Kỹ sư phần mềm)
// "departmentId": "string"
