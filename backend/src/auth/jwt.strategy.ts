/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseConfig } from 'src/config/database.config';
import { User } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
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
      // Cấu hình bộ trích xuất token (Extractor)
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Cách 1: Thử lấy từ Authorization: Bearer <token>
        ExtractJwt.fromAuthHeaderAsBearerToken(),

        // Cách 2: Thử lấy từ Cookie có tên là 'accessToken'
        (req: Request) => {
          let token: any = null;
          if (req && req.cookies) {
            token = req.cookies['accessToken'];
          }
          return token;
        },
      ]),
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
