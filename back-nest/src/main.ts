import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
    // Enable CORS
    app.enableCors({
      origin: 'http://localhost:8080', // Update with your frontend URL
    });
  
  await app.listen(5000);
}
bootstrap();
