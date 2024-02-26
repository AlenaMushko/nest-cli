import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  id: string;

  @ApiProperty({
    description: 'Name of the user',
    default: 'John Doe',
  })
  name?: string;

  @ApiProperty({ default: 'john@mail.com' })
  email: string;

  @ApiProperty({ default: 'password_123' })
  password: string;
}
