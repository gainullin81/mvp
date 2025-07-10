import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import type { Inventory } from '../../generated/prisma';

@Injectable()
export class InventoryService {
  private prisma = new PrismaClient();

  async findAll(): Promise<Inventory[]> {
    return this.prisma.inventory.findMany();
  }

  async findOne(id: number): Promise<Inventory | null> {
    return this.prisma.inventory.findUnique({ where: { id } });
  }

  async create(data: Omit<Inventory, 'id' | 'updatedAt'>): Promise<Inventory> {
    return this.prisma.inventory.create({ data });
  }

  async update(id: number, data: Partial<Omit<Inventory, 'id' | 'updatedAt'>>): Promise<Inventory> {
    return this.prisma.inventory.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Inventory> {
    return this.prisma.inventory.delete({ where: { id } });
  }
} 