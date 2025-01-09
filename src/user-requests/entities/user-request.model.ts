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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => RequestType)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  requestTypeId: number;

  @BelongsTo(() => RequestType)
  requestType: RequestType;

  @HasMany(() => ReqRecv)
  reqRecvs: ReqRecv[];
}
