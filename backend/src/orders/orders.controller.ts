import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from '../../generated/prisma';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех заказов/продаж' })
  @ApiResponse({ status: 200, description: 'Список заказов' })
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Заказ найден' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Создать продажу/заказ' })
  @ApiBody({ description: 'Данные для создания заказа', type: Object })
  @ApiResponse({ status: 201, description: 'Заказ создан' })
  async create(@Body() data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return this.ordersService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить заказ по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ description: 'Данные для обновления заказа', type: Object })
  @ApiResponse({ status: 200, description: 'Заказ обновлён' })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<Order, 'id' | 'createdAt'>>): Promise<Order> {
    return this.ordersService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заказ по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Заказ удалён' })
  async remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.remove(Number(id));
  }
} 