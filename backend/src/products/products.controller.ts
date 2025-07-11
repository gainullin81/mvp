import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from '../../generated/prisma';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех товаров' })
  @ApiResponse({ status: 200, description: 'Список товаров' })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Товар найден' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый товар' })
  @ApiBody({ description: 'Данные нового товара', type: Object })
  @ApiResponse({ status: 201, description: 'Товар создан' })
  async create(@Body() data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить товар по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ description: 'Данные для обновления товара', type: Object })
  @ApiResponse({ status: 200, description: 'Товар обновлён' })
  async update(@Param('id') id: string, @Body() data: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product> {
    return this.productsService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Товар удалён' })
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(Number(id));
  }
} 