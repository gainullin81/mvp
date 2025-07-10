import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from '../../generated/prisma';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return this.ordersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Omit<Order, 'id' | 'createdAt'>>): Promise<Order> {
    return this.ordersService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.remove(Number(id));
  }
} 