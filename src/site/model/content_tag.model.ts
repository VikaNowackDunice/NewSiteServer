import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';

import { ContentTagCreate } from '../types/content_tag';
import { Content } from './content.model';
import { Tag } from './tag.model';

@Table({ tableName: 'content_tag' })
export class ContentTag extends Model<ContentTag, ContentTagCreate> {
  @ForeignKey(() => Content)
  contentId: number;

  @ForeignKey(() => Tag)
  tagId: number;

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
