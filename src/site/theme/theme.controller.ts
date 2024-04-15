import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { CreateThemeDto } from '../dto/create-theme.dto';
import { ThemeService } from './theme.service';

@Controller()
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  getAllTheme() {
    return this.themeService.getAllTheme();
  }

  @Get('/:id')
  getOneTheme(@Param('id') id: number) {
    return this.themeService.getOneTheme(id);
  }

  @Post()
  createTheme(@Body() themeDto: CreateThemeDto) {
    return this.themeService.createTheme(themeDto);
  }

  @Put('/:id')
  updateTheme(@Param('id') id: number, @Body() themeDto: CreateThemeDto) {
    return this.themeService.updateTheme(themeDto, id);
  }
  @Delete('/:id')
  deleteOneTheme(@Param('id') id: number) {
    return this.themeService.deleteOneTheme(id);
  }
}
