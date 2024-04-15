import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Theme } from '../model/theme.model';
import { CreateThemeDto } from '../dto/create-theme.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectModel(Theme) private readonly themeRepository: typeof Theme,
  ) {}

  async getAllTheme(): Promise<Theme[]> {
    try {
      const todos = await this.themeRepository.findAll();
      return todos;
    } catch (error) {
      throw new NotFoundException('Todo items not found');
    }
  }

  async getOneTheme(id: number): Promise<Theme> {
    try {
      const theme = await this.themeRepository.findOne({
        where: { id },
      });
      return theme;
    } catch (error) {
      throw new NotFoundException('Todo items not found');
    }
  }

  async createTheme(themeDto: CreateThemeDto): Promise<Theme> {
    try {
      const newTheme = await this.themeRepository.create(themeDto);
      return newTheme;
    } catch (error) {
      throw new NotFoundException('Failed to create theme');
    }
  }

  async updateTheme(themeDto: CreateThemeDto, id: number): Promise<Theme> {
    try {
      const [theme] = await this.themeRepository.update(
        { name: themeDto.text },
        { where: { id } },
      );
      if (theme === 0) {
        throw new NotFoundException(`Theme with id ${id} was not found`);
      }
      return theme[0];
    } catch (error) {
      throw new NotFoundException(`With id ${id} was not found`);
    }
  }

  async deleteOneTheme(id: number): Promise<string> {
    try {
      const deleteTheme = await this.themeRepository.destroy({
        where: {
          id,
        },
      });
      if (deleteTheme === 0) {
        throw new NotFoundException(`Theme with id ${id} was not found`);
      }
      return `Theme with id ${id} was successfully deleted`;
    } catch (error) {
      throw new NotFoundException(`Theme with id ${id} was not found`);
    }
  }
}
