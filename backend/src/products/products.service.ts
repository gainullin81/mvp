import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import type { Product } from '../../generated/prisma';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async update(id: number, data: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
} 