import { errorHandler } from '@helper/error-handler';
import { Order, OrderModel } from '@models/Order';
import { OrderManager } from './order.manager';
import { log } from '@helper/logger';

export async function createOrder(event) {
  log('create order', event);

  try {
    const order: Order = event.body;
    const orderManager = new OrderManager();
    return await orderManager.createOrder(order);
  } catch (error) {
    errorHandler(error);
  }
}

export async function getOrdersForClient(event) {
  log('get orders for client', event);

  try {
    return await OrderModel.scan({ clientId: event.path.clientId }).exec();
  } catch (error) {
    errorHandler(error);
  }
}
