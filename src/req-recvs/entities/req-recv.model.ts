import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Request } from 'src/requests/entities/request.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class ReqRecv extends Model<ReqRecv> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  requestId: number;

  @BelongsTo(() => Request, 'userId')
  request: Request;
}
