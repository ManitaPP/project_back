import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(13, 13)
  thaiId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @Matches(/^0[0-9]{9}$/, { message: 'ข้อมูลเบอร์โทรศัพท์ไม่ถูกต้อง' })
  tel: string;

  leaderId: number;
  positionId: number;
  departmentId: number;
}
