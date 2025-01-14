import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserRequest } from 'src/user-requests/entities/user-request.model';
import { User } from 'src/users/models/user.model';

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
    type: DataType.ENUM(
      'รอดำเนินการ',
      'กำลังดำเนินการ',
      'ขอข้อมูลเพิ่มเติม',
      'อนุมัติ',
      'ไม่อนุมัติ',
    ),
    allowNull: false,
  })
  status:
    | 'รอดำเนินการ'
    | 'กำลังดำเนินการ'
    | 'ขอข้อมูลเพิ่มเติม'
    | 'อนุมัติ'
    | 'ไม่อนุมัติ';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  sentAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  respondedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => UserRequest)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  requestId: number;

  @BelongsTo(() => UserRequest, 'requestId')
  request: UserRequest;
}
