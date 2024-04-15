import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Theme } from '../model/theme.model';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';

@Module({
  controllers: [ThemeController],
  providers: [ThemeService],
  imports: [SequelizeModule.forFeature([Theme])],
})
export class ThemeModule {}
