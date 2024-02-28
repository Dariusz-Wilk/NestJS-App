import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({ where: { id } });
  }

  public delete(id: string): Promise<Order> {
    return this.prismaService.order.delete({ where: { id } });
  }

  public create(
    orderData: Omit<Order, 'id' | 'productId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.create({
      data: { ...orderData, productId: uuidv4() },
    });
  }

  public updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'productId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: { ...orderData, productId: uuidv4() },
    });
  }
}
