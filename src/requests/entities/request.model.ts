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
export class Request extends Model<Request> {
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

  @HasMany(() => ReqRecv)
  reqRecvs: ReqRecv[];

  @ForeignKey(() => RequestType)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  requestTypeId: number;

  @BelongsTo(() => RequestType, 'reTypeId')
  requestType: RequestType;
}
