import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class ReportsService {
  private prisma = new PrismaClient();

  async getSalesReport() {
    // Пример: количество всех продаж
    return this.prisma.order.aggregate({
      _count: { id: true },
    });
  }

  async getInventoryActionsReport() {
    // Пример: все действия с инвентарём
    return this.prisma.inventoryAction.findMany({
      include: { product: true, actor: true },
    });
  }
} 