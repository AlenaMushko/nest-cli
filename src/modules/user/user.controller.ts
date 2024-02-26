import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResponseDto } from './dto/res/user.response.dto';
import { UserService } from './services/user.service';

@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @ApiConflictResponse({ description: 'Conflict' })
  // @ApiForbiddenResponse({ description: 'Access denied' })
  // @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  // @CacheCustom(3000) //custom decorator
  public async findAll(): Promise<string> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<string> {
    return await this.userService.remove(+id);
  }
}
