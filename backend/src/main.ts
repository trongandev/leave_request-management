import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/dto/interceptors/transform.interceptor';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // useGlobalPipes: sử dụng ValidationPipe để tự động validate dữ liệu đầu vào
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có field lạ gửi lên
      transform: true, // Tự động convert kiểu dữ liệu (ví dụ string sang number)
    }),
  );

  // useGlobalInterceptors: sử dụng TransformInterceptor để tự động format dữ liệu đầu ra
  app.useGlobalInterceptors(new TransformInterceptor());

  // Cấu hình swagger
  const config = new DocumentBuilder()
    .setTitle('LRM - Leave Request Management')
    .setDescription('Danh sách API cho ứng dụng quản lý yêu cầu nghỉ phép')
    .setVersion('1.0')
    // .addTag('users') // Phân nhóm API
    .addBearerAuth() // Nếu bạn có dùng JWT sau này
    .build();

  // 2. Khởi tạo tài liệu
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    customSiteTitle: 'Backend Generator',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  SwaggerModule.setup('/', app, document);
  await app.listen(process.env.PORT ?? 5050);
}

void bootstrap();
