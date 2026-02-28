import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HydratedDocument } from 'mongoose';
import { User } from '../users/users.schema';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): HydratedDocument<User> => {
    const { user } = ctx
      .switchToHttp()
      .getRequest<{ user: HydratedDocument<User> }>();
    return user;
  },
);
