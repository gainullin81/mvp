import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('by-email')
  async getByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
} 