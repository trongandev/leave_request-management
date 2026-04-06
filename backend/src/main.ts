import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/dto/interceptors/transform.interceptor';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { AllExceptionsFilter } from './common/dto/filters/http-exception.filter';
import { ErrorLogService } from './error-log/error-log.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(ErrorLogService);

  app.enableCors();
  app.use(morgan('dev'));
  app.use(cookieParser());
  // useGlobalPipes: sử dụng ValidationPipe để tự động validate dữ liệu đầu vào
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có field lạ gửi lên
      transform: true, // Tự động convert kiểu dữ liệu (ví dụ string sang number)
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));
  // useGlobalInterceptors: sử dụng TransformInterceptor để tự động format dữ liệu đầu ra
  app.useGlobalInterceptors(new TransformInterceptor());

  // 2. Khởi tạo tài liệu
  if (process.env.NODE_ENV !== 'development') {
    const config = new DocumentBuilder()
      .setTitle('LRM - Leave Request Management')
      .setDescription('Danh sách API cho ứng dụng quản lý yêu cầu nghỉ phép')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 5050);
}

void bootstrap();
