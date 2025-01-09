import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Request } from 'src/requests/entities/request.model';

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

  @HasMany(() => Request)
  request: Request[];
}
