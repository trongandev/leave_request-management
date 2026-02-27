import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseConfig } from 'src/config/database.config';
import { User } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private dbConfig: DatabaseConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: dbConfig.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userModel
      .findById(payload.sub)
      .populate('roleId')
      .exec();

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    // user này sẽ được gán vào request.user
    return user;
  }
}
