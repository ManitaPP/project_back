import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Village } from 'src/villages/entities/village.model';

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

  @ForeignKey(() => Village)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  villageId: number;

  @BelongsTo(() => Village)
  village: Village;
}
