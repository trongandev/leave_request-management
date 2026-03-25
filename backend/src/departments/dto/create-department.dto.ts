import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Tên phòng ban tiếng anh không được để trống' })
  originName: string; // Tên gốc của phòng ban (tiếng anh)

  @IsNotEmpty({ message: 'Tên phòng ban tiếng việt không được để trống' })
  name: string; // Tên phòng ban (VD: Kỹ thuật) (tiếng việt)

  @IsNotEmpty({ message: 'Mã phòng ban không được để trống' })
  code: string; // Mã phòng ban (VD: TECH, HR, FIN)

  @IsOptional()
  description: string;
}
