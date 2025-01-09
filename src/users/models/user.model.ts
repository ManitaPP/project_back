import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Department } from 'src/departments/entities/department.model';
import { Position } from 'src/positions/entities/position.model';
import { ReqRecv } from 'src/req-recvs/entities/req-recv.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  thaiId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tel: string;

  @Column({
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
  })
  role: 'admin' | 'user';

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  leaderId: number;

  @BelongsTo(() => User, 'leaderId')
  leader: User;

  @HasMany(() => User, 'leaderId')
  subordinates: User[];

  @ForeignKey(() => Position)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  positionId: number;

  @BelongsTo(() => Position)
  position: Position;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @HasMany(() => ReqRecv)
  reqRecvs: ReqRecv[];
}
