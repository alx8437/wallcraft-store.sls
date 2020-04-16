import * as uuid from 'node-uuid';
import { Order } from '@models/Order';
import { PromotionalCodeModel } from '@models/PromotionalCode';

export class OrderService {
  async validationPromotionalCode(order: Order) {
    if (order.activatedPromotionalCode && order.promotionalCode?.code) {
      const data = await PromotionalCodeModel.scan({
        code: order.promotionalCode.code,
        discountPercentage: order.promotionalCode.discountPercentage,
      }).exec();

      if (!data['count']) {
        throw { message: 'Promotional code does not exist!' };
      }
    }
  }

  async generateClientId(order: Order) {
    if (!order.clientId) {
      order.clientId = uuid.v4();
    }
  }
}
