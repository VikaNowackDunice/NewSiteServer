import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './site/author/user.model';
import { Post } from './site/post/post.model';
import { Tag } from './site/post/tag.model';
import { UserModule } from './site/author/author.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthModule } from './site/author/jwt/jwt.module';
import { PostModule } from './site/post/post.module';
import { PostTag } from './site/post/post-tag.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dialect: config.get('DB_DIALECT'),
        host: config.get('POSTGRE_HOST'),
        port: Number(config.get('POSTGRE_PORT')),
        username: config.get('POSTGRE_USERNAME'),
        password: config.get('POSTGRE_PASSWORD'),
        database: config.get('POSTGRE_DATABASE'),
        models: [User, Post, Tag, PostTag],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    JwtAuthModule,
    JwtModule,
  ],
})
export class AppModule {}
