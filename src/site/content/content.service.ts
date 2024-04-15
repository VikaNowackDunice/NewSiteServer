import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Content } from '../model/content.model';
import { CreateContentDto } from '../dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content) private readonly contentRepository: typeof Content,
  ) {}

  async getAllContent(): Promise<Content[]> {
    try {
      const getAllContent = await this.contentRepository.findAll();
      return getAllContent;
    } catch (error) {
      throw new NotFoundException('Content not found');
    }
  }
  async getOneContent(id: number): Promise<Content> {
    try {
      const content = await this.contentRepository.findOne({
        where: {
          id,
        },
      });
      return content;
    } catch {
      throw new NotFoundException('Content not found');
    }
  }

  async createContent(contentDto: CreateContentDto): Promise<Content> {
    try {
      const content = await this.contentRepository.create(contentDto);
      return content;
    } catch {
      throw new NotFoundException('Failed to create content');
    }
  }

  async updateContentOne(
    contentDto: CreateContentDto,
    id: number,
  ): Promise<Content> {
    try {
      const [updateContent] = await this.contentRepository.update(
        { content: contentDto.text, header: contentDto.header },
        { where: { id } },
      );
      if (updateContent === 0) {
        throw new NotFoundException(`Content with is ${id} was not found`);
      }
      return updateContent[0];
    } catch (error) {
      throw new NotFoundException(`Content item was not ${id}`);
    }
  }

  async deleteOneContent(id: number): Promise<string> {
    try {
      const deleteContent = await this.contentRepository.destroy({
        where: {
          id,
        },
      });

      if (deleteContent === 0) {
        throw new NotFoundException(`Content with is ${id} was not found`);
      }
      return `Content with id ${id} was successfully deleted`;
    } catch (error) {
      throw new NotFoundException('Content was not deleted');
    }
  }
}
