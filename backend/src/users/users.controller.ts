import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('by-email')
  @ApiOperation({ summary: 'Получить пользователя по email (админ)' })
  @ApiQuery({ name: 'email', type: String })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async getByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
} 