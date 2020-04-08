import { checkPromotionalCode } from './manager';
import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';

import { Order, OrderModel } from '@models/Order';
import { ClientModel } from '@models/Client';

export async function createOrder(event) {

  try {
    const newOrder: Order = event.body;
    await checkPromotionalCode(newOrder.promotionalCode);

    return { status: 1, data: {} };
  } catch (error) {
    errorHandler(error);
  }
}

export async function getOrders(event) {
  log('get-order', event);
}

export async function getOrdersForClient(event) {
  log('get-order-for-client', event);
}
