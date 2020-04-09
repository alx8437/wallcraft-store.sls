import { checkPromotionalCode, validationClient, validationProducts } from './manager';
import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { OrderModel } from '@models/Order';

export async function createOrder(event) {

  try {
    const order = event.body;
    await checkPromotionalCode(order);
    await validationProducts(order);
    await validationClient(order);

    const requestData = await OrderModel.create({
      id: '',
      clientId: order.clientId,
      date: order.date,
      products: order.products,
      fullPrice: order.fullPrice,
      activatedPromotionalCode: order.activatedPromotionalCode,
      promotionalCodeId: order.promotionalCodeId,
    });

    return { status: 1, data: requestData };
  } catch (error) {
    errorHandler(error);
  }
}

export async function getOrders(event) {
  log('get-order', event);
}

export async function getOrdersForClient(event) {
  log('get-order-for-client', event);

  try {
    let orders = await OrderModel.scan({ clientId: event.path.clientId }).exec();

    return { status: 1, data: orders };
  } catch (error) {
    errorHandler(error);
  }
}
