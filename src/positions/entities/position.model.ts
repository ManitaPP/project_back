import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Position extends Model<Position> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @HasMany(() => User)
  users: User[];
}
