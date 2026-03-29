/* eslint-disable @typescript-eslint/no-unsafe-call */

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

  let query: any = model.find(filter).skip(skip).limit(limit);

  // Áp dụng populate nếu có
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      // Nếu là mảng, populate từng cái một
      options.populate.forEach((pop: any) => {
        query = query.populate(pop);
      });
    } else {
      // Nếu là object hoặc string, populate trực tiếp
      query = query.populate(options.populate);
    }
  }

  // Áp dụng sort nếu có
  if (options.sort) {
    query = query.sort(options.sort);
  }

  query = query.lean();

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
      has_next: page < Math.ceil(total / limit),
      has_prev: page > 1,
    },
  };
}

/**
 // Cách 1: Populate đơn giản
await paginate(this.userModel, paginationDto, {}, { 
  populate: 'roleId' 
});

// Cách 2: Populate nhiều field
await paginate(this.userModel, paginationDto, {}, { 
  populate: ['roleId', 'departmentId'] 
});

// Cách 3: Populate với select
await paginate(this.userModel, paginationDto, {}, { 
  populate: {
    path: 'roleId',
    select: 'name permissions', // Chỉ lấy các field này
  }
});

// Cách 4: Kết hợp populate + sort
await paginate(this.userModel, paginationDto, {}, { 
  populate: populateOptions,
  sort: { createdAt: -1 }
});
 */
