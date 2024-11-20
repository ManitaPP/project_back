/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './entities/department.model';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentModel: typeof Department,
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentModel.create(createDepartmentDto);
    return department;
  }

  findAll() {
    return this.departmentModel.findAll();
  }

  findOne(id: number) {
    const department = this.departmentModel.findByPk(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const departmentId = await this.departmentModel.findByPk(id);
    if (!departmentId) {
      throw new NotFoundException('department not found');
    } else {
      const department = await this.departmentModel.update(
        updateDepartmentDto,
        {
          where: { id: id },
        },
      );
      return department;
    }
  }
  async remove(id: number) {
    const department = await this.departmentModel.findByPk(id);
    if (department) {
      await department.destroy();
    }
  }
}
