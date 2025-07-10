import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import type { Order } from '../../generated/prisma';

@Injectable()
export class OrdersService {
  private prisma = new PrismaClient();

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findOne(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async create(data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async update(id: number, data: Partial<Omit<Order, 'id' | 'createdAt'>>): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
} 