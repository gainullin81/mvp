import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, OrdersModule, InventoryModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
