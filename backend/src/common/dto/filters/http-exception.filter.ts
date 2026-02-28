import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { ErrorLog } from 'src/logs/error-log.schema';

@Catch() // Để trống để bắt TẤT CẢ các loại lỗi
export class AllExceptionsFilter implements ExceptionFilter {
  // constructor(
  //   @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLog>,
  // ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const err = exception as {
      response?: { message?: string };
      message?: string;
      stack?: string;
    };

    // Kiểm tra nếu là lỗi HTTP (404, 400...) hay lỗi server (500)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const isProduction = process.env.NODE_ENV === 'production';

    // 1. Cấu trúc nội dung lỗi trả về Client
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: err?.response?.message || err.message || 'Internal server error',
      // Chỉ hiện stack trace ở môi trường development
      stack: isProduction ? undefined : err.stack,
    };

    // // 2. Ghi log lỗi vào MongoDB (Bất kể môi trường nào)
    // try {
    //   await this.errorLogModel.create({
    //     path: request.url,
    //     method: request.method,
    //     statusCode: status,
    //     message: errorResponse.message,
    //     stack: err.stack,
    //   });
    // } catch (dbError) {
    //   console.error('Không thể ghi log vào DB:', dbError);
    // }

    response.status(status).json(errorResponse);
  }
}
