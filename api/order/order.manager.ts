import * as uuid from 'node-uuid';
import { PromotionalCodeModel } from '@models/PromotionalCode';
import { Order, OrderModel } from '@models/Order';

export class OrderManager {

  async createOrder(order: Order) {
    await this.checkPromotionalCode(order);
    await this.generateClientId(order);

    return OrderModel.create(order);
  }

  async checkPromotionalCode(order: Order) {
    if (order.activatedPromotionalCode) {
      if (order.promotionalCode?.code) {
        const data = await PromotionalCodeModel.scan({
          code: order.promotionalCode.code,
          discountPercentage: order.promotionalCode.discountPercentage,
        }).exec();

        if (!data['count']) {
          throw { message: 'Promotional code does not exist!' };
        }
      }
    }
  }

  async generateClientId(order: Order) {
    if (!order.clientId) {
      order.clientId = uuid.v4();
    }
  }
}
