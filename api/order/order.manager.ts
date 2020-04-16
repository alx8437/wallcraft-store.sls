import { Order, OrderModel } from '@models/Order';
import { OrderService } from '@services/order.service';

export class OrderManager {

  async createOrder(order: Order) {
    const orderService = new OrderService();
    await orderService.validationPromotionalCode(order);
    await orderService.generateClientId(order);

    return OrderModel.create(order);
  }

  async getOrdersForClient(clientId: string) {
    return await OrderModel.scan({ clientId }).exec();
  }
}
