import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Author } from './site/model/author.model';
import { Content } from './site/model/content.model';
import { Tag } from './site/model/tag.model';
import { Theme } from './site/model/theme.model';
import { ContentTag } from './site/model/content_tag.model';
import { ContentTheme } from './site/model/content_theme.model';
import { ContentModule } from './site/content/content.module';
import { ThemeModule } from './site/theme/theme.module';
import { TagModule } from './site/tag/tag.module';
import { AuthorModule } from './site/author/author.module';

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
        models: [Author, Content, Tag, Theme, ContentTag, ContentTheme],
      }),
      inject: [ConfigService],
    }),
    AuthorModule,
    ContentModule,
    ThemeModule,
    TagModule,
  ],
})
export class AppModule {}
