import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import type { InventoryAction } from '../../generated/prisma';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех записей инвентаря' })
  @ApiResponse({ status: 200, description: 'Список инвентаря' })
  async findAll(): Promise<InventoryAction[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись инвентаря по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Запись инвентаря найдена' })
  @ApiResponse({ status: 404, description: 'Запись не найдена' })
  async findOne(@Param('id') id: string): Promise<InventoryAction | null> {
    return this.inventoryService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Создать запись инвентаря' })
  @ApiBody({ description: 'Данные для создания записи', type: Object })
  @ApiResponse({ status: 201, description: 'Запись создана' })
  async create(@Body() data: Omit<InventoryAction, 'id' | 'timestamp'>): Promise<InventoryAction> {
    return this.inventoryService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись инвентаря по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ description: 'Данные для обновления записи', type: Object })
  @ApiResponse({ status: 200, description: 'Запись обновлена' })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<InventoryAction, 'id' | 'timestamp'>>): Promise<InventoryAction> {
    return this.inventoryService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись инвентаря по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Запись удалена' })
  async remove(@Param('id') id: string): Promise<InventoryAction> {
    return this.inventoryService.remove(Number(id));
  }
} 