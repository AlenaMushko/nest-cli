import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    default: 'John Doe',
  })
  @IsString()
  @Transform(({ value }) => value.toString().trim())
  @MinLength(3)
  @MaxLength(30)
  name?: string;

  @ApiProperty({ default: 'john@mail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password_123' })
  @Transform(({ value }) => value.toString().trim())
  @IsString()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$')
  password: string;

  @Type(() => Date)
  @IsOptional()
  date: string;
}
