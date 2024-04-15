import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Tag } from '../model/tag.model';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [SequelizeModule.forFeature([Tag])],
})
export class TagModule {}
