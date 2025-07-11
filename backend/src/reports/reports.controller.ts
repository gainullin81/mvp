import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  async getSalesReport() {
    return this.reportsService.getSalesReport();
  }

  @Get('inventory')
  async getInventoryActionsReport() {
    return this.reportsService.getInventoryActionsReport();
  }
} 