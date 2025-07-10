import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Role } from '../../generated/prisma';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: { email: string; password: string; name: string; role: Role }) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto.email, dto.password);
  }
} 