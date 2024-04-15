import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Content } from '../model/content.model';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [SequelizeModule.forFeature([Content])],
})
export class ContentModule {}
