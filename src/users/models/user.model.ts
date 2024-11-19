import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

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

  @Column({
    type: DataType.ENUM(
      'กำนัน',
      'ผู้ใหญ่บ้าน',
      'ผู้ช่วยผู้ใหญ่บ้าน',
      'ชาวบ้าน',
    ),
    allowNull: true,
  })
  position: 'กำนัน' | 'ผู้ใหญ่บ้าน' | 'ผู้ช่วยผู้ใหญ่บ้าน' | 'ชาวบ้าน';

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
}
// @ForeignKey(() => Village)
// @Column({
//   type: DataType.INTEGER,
//   allowNull: true,
// })
// villageId: number;

// @BelongsTo(() => Village)
// village: Village;
