import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Role } from '../../generated/prisma';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' }, name: { type: 'string' }, role: { type: 'string', enum: ['SELLER', 'SUPPLIER', 'DIRECTOR'] } } } })
  @ApiResponse({ status: 201, description: 'Пользователь зарегистрирован' })
  async register(@Body() dto: { email: string; password: string; name: string; role: Role }) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'Успешный вход, возвращает access_token и user' })
  async login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto.email, dto.password);
  }
} 