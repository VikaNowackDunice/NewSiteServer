import {
  Table,
  Model,
  ForeignKey,
  DataType,
  Column,
} from 'sequelize-typescript';

import { ContentThemeCreate } from '../types/content_theme';
import { Content } from './content.model';
import { Theme } from './theme.model';

@Table({ tableName: 'content_theme' })
export class ContentTheme extends Model<ContentTheme, ContentThemeCreate> {
  @ForeignKey(() => Content)
  contentId: number;

  @ForeignKey(() => Theme)
  tagId: number;

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
