import { checkPromotionalCode, validationClient, validationProducts } from './manager';
import { errorHandler } from '@helper/error-handler';
import { OrderModel } from '@models/Order';
import { ProductModel } from '@models/Product';

export async function createOrder(event) {
  try {
    const order = event.body;
    await checkPromotionalCode(order);
    await validationProducts(order);
    await validationClient(order);

    const responseData = await OrderModel.create(order);
    return { status: 1, clientId: order.clientId, data: responseData };
  } catch (error) {
    errorHandler(error);
  }
}

export async function getOrders(event) {
  try {
    const orders = await OrderModel.scan().exec();
    return { status: 1, data: orders };
  } catch (error) {
    errorHandler(error);
  }
}

export async function getOrdersForClient(event) {
  try {
    let orders: any = await OrderModel.scan({ clientId: event.path.clientId }).exec();
    for (let order of orders) {
      order.products = await ProductModel.batchGet(order.products);
    }

    return { status: 1, data: orders };
  } catch (error) {
    errorHandler(error);
  }
}
