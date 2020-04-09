import { ProductModel } from '@models/Product';
import { PromotionalCodeModel } from '@models/PromotionalCode';
import { Order } from '@models/Order';
import { ClientModel } from '@models/Client';

export async function checkPromotionalCode(order: Order) {
  if (order.promotionalCode) {
    const requestData = await PromotionalCodeModel.scan({
      code: order.promotionalCode.code,
      discountPercentage: order.promotionalCode.discountPercentage,
    }).exec();

    if (requestData['count'] === 0) {
      throw { message: 'Promotional code does not exist!' };
    } else {
      order.promotionalCodeId = order.promotionalCode.code;
    }
  }
}

export async function validationProducts(order: Order) {
  if (!order.products) {
    throw { message: 'Products does not exist!' };
  } else {
    const discountPercentage = order?.promotionalCode?.discountPercentage || 0;
    const selectedProducts = await ProductModel.batchGet(order.products);
    const fullPrice = selectedProducts.reduce((sum, value) =>
      sum + Math.round(value.price - (value.price * discountPercentage / 100)), 0);

    if (order.fullPrice !== fullPrice) {
      throw { message: 'Order price no valid!' };
    }
  }
}

export async function validationClient(order: Order) {
  if (!order.clientId) {
    let client: any = await ClientModel.create({});
    order.clientId = client.id;
  }
}
