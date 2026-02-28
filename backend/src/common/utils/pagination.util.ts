/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Model } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';

export async function paginate<T>(
  model: Model<T>,
  paginationDto: PaginationDto,
  filter: any = {},
  options: any = {}, // Ví dụ: populate, sort...
) {
  const { page, limit } = paginationDto;
  const skip = (page - 1) * limit;

  const query = model.find(filter).skip(skip).limit(limit).lean();

  // Cho phép truyền thêm populate nếu cần
  if (options.populate) query.populate(options.populate);
  if (options.sort) query.sort(options.sort);

  const [data, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter),
  ]);

  return {
    data,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      last_page: Math.ceil(total / limit),
    },
  };
}
