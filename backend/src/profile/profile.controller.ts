import { Controller, UseGuards, Get } from '@nestjs/common';
import {} from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { HydratedDocument } from 'mongoose';
import { User } from '../users/users.schema';
import { ProfileService } from './positions.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('')
  get(@CurrentUser() user: HydratedDocument<User>) {
    return this.profileService.getProfile(user);
  }
}
