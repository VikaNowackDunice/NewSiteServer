import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { ThemeCreate } from '../types/theme';
import { Content } from './content.model';
import { ContentTheme } from './content_theme.model';

@Table({ tableName: 'theme' })
export class Theme extends Model<Theme, ThemeCreate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Content, () => ContentTheme)
  content: Content[];

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
