import { Controller, UseGuards, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { HydratedDocument } from 'mongoose';
import { User } from '../users/users.schema';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  get(@CurrentUser() user: HydratedDocument<User>) {
    return user;
  }
}
