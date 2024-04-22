import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from '../model/user.model';
import { AuthorController } from './author.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './jwt/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthService } from './jwt/jwt.strategy';

@Module({
  controllers: [AuthorController],
  providers: [AuthService, LocalStrategy, JwtAuthService],
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
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
  exports: [AuthService],
})
export class UserModule {}
