import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';

import { ContentCreate } from '../types/content';
import { Author } from './author.model';
import { Theme } from './theme.model';
import { ContentTag } from './content_tag.model';
import { ContentTheme } from './content_theme.model';
import { Tag } from './tag.model';

@Table({ tableName: 'content' })
export class Content extends Model<Content, ContentCreate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  header: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => Author)
  @Column
  userId: number;

  @BelongsTo(() => Author)
  author: Author;

  @BelongsToMany(() => Tag, () => ContentTag)
  tags: Tag[];

  @BelongsToMany(() => Theme, () => ContentTheme)
  theme: Theme[];

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
