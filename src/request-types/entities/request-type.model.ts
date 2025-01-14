import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserRequest } from 'src/user-requests/entities/user-request.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class RequestType extends Model<RequestType> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type: string;

  @HasMany(() => UserRequest)
  request: UserRequest[];
}
