import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import type { Inventory } from '../../generated/prisma';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Inventory | null> {
    return this.inventoryService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: Omit<Inventory, 'id' | 'updatedAt'>): Promise<Inventory> {
    return this.inventoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Omit<Inventory, 'id' | 'updatedAt'>>): Promise<Inventory> {
    return this.inventoryService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.remove(Number(id));
  }
} 