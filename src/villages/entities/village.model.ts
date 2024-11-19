import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Village extends Model<Village> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  villageId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  villageNumber: string; // หมู่ที่

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string; // ชื่อหมู่บ้าน

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  subdistrict: string; // ตำบล

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  district: string; // อำเภอ

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  province: string; // จังหวัด

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  postalCode: string; // รหัสไปรษณีย์

  // @HasMany(() => User) // หมู่บ้านจะมีหลาย user (เช่น กำนัน, ผู้ใหญ่บ้าน, ชาวบ้าน)
  // users: User[];
}
