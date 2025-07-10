import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class ReportsService {
  private prisma = new PrismaClient();

  async getSalesReport() {
    // Пример: сумма всех продаж
    return this.prisma.order.aggregate({
      _sum: { total: true },
      _count: { id: true },
    });
  }

  async getInventoryReport() {
    // Пример: остатки по всем товарам
    return this.prisma.inventory.findMany({
      include: { product: true },
    });
  }
} 