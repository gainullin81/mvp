import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import type { InventoryAction } from '../../generated/prisma';

@Injectable()
export class InventoryService {
  private prisma = new PrismaClient();

  async findAll(): Promise<InventoryAction[]> {
    return this.prisma.inventoryAction.findMany();
  }

  async findOne(id: number): Promise<InventoryAction | null> {
    return this.prisma.inventoryAction.findUnique({ where: { id } });
  }

  async create(data: Omit<InventoryAction, 'id' | 'timestamp'>): Promise<InventoryAction> {
    return this.prisma.inventoryAction.create({ data });
  }

  async update(id: number, data: Partial<Omit<InventoryAction, 'id' | 'timestamp'>>): Promise<InventoryAction> {
    return this.prisma.inventoryAction.update({ where: { id }, data });
  }

  async remove(id: number): Promise<InventoryAction> {
    return this.prisma.inventoryAction.delete({ where: { id } });
  }
} 