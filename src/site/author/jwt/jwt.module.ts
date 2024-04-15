import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtAuthService } from './jwt.strategy';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('secret_jwt'),
        signOptions: config.get('expire_jwt'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtModule],
})
export class JwtAuthModule {}
