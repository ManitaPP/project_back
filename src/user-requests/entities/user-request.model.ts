import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ReqRecv } from 'src/req-recvs/entities/req-recv.model';
import { RequestType } from 'src/request-types/entities/request-type.model';
import { User } from 'src/users/models/user.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class UserRequest extends Model<UserRequest> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reason: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  file: string;

  @ForeignKey(() => RequestType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  requestTypeId: number;

  @BelongsTo(() => RequestType)
  requestType: RequestType;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ReqRecv)
  reqRecvs: ReqRecv[];
}
