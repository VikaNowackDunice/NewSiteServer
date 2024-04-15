import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { TagCreate } from '../types/tag';
import { Content } from './content.model';
import { ContentTag } from './content_tag.model';

@Table({ tableName: 'tag' })
export class Tag extends Model<Tag, TagCreate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Content, () => ContentTag)
  content: Content[];

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
