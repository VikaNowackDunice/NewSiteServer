import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const PORT = configService.get('PORT') || configService.get('PORT_RESERVE');

    app.enableCors({
      origin: '*',
    });

    await app.listen(PORT, () => console.log(`Server started on port=${PORT}`));
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}
bootstrap();
