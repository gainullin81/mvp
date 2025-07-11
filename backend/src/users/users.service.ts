import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import type { User, Role } from '../../generated/prisma';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { email: string; password: string; name: string; role: Role }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { password, ...rest } = data;
    return this.prisma.user.create({
      data: { ...rest, passwordHash: hashedPassword },
    });
  }
} 