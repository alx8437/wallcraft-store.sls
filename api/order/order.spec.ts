import axios from 'axios';
import { createOrder, getOrdersForClient } from './handler';
import { PromotionalCode, PromotionalCodeModel } from '@models/PromotionalCode';
import { OrderManager } from './order.manager';
import { Order, OrderModel } from '@models/Order';
import { codes, orders, testOrder } from './order.helper';

let testOrderId: string;

beforeEach(async () => {
  await OrderModel.batchPut(orders);
  await PromotionalCodeModel.batchPut(codes);
});
afterEach(async () => {
  for (const { id } of orders) {
    await OrderModel.delete(id);
  }
  for (const { code } of codes) {
    await PromotionalCodeModel.delete(code);
  }
  await OrderModel.delete(testOrderId);
});

describe('(Unit test)Order module', () => {
  test('Create order', async () => {
    const data = await createOrder({ body: testOrder });
    testOrderId = data!.id;
    expect(testOrder.products).toEqual(data?.products);
  });

  test('Get order for client', async () => {
    const clientId = '2b68d63-1b75-4a90-be91-fe77fb90ff46';
    const data = await getOrdersForClient({ path: { clientId } });
    const order = data![0];
    expect(order.clientId).toBe(clientId);
  });

  test('Validation promotional code', async () => {
    const orderManager = new OrderManager();
    const order = new Order();
    order.activatedPromotionalCode = true;
    order.promotionalCode = { code: 'nonexistent', discountPercentage: 500 };
    try {
      await orderManager.createOrder(order);
    } catch (error) {
      expect(error).toEqual({ message: 'Promotional code does not exist!' });
    }
  });

  test('Get order for client with wrong params', async () => {
    try {
      await getOrdersForClient({});
    } catch (error) {
      expect(error).toMatch('[400]');
    }
  });

  test('Create order with wrong params', async () => {
    const order = { clientId: 1123213, products: 'string', activatedPromotionalCode: false };
    try {
      await createOrder({ body: order });
    } catch (error) {
      expect(error).toMatch('[400]');
    }
  });
});

describe('(Integration test) Order module', () => {
  test('Check promotional code and create order', async () => {
    const code = 'wl20';
    const checkCode = await axios({
      url: 'http://localhost:3000/api/promotional-code/check',
      method: 'get',
      params: { code },
    });
    const promotionalCode: PromotionalCode = checkCode.data;
    testOrder.activatedPromotionalCode = true;
    testOrder.promotionalCode = promotionalCode;

    const createOrder = await axios({
      url: 'http://localhost:3000/api/order',
      method: 'post',
      data: testOrder,
    });
    const orderBody = createOrder.data;

    expect(orderBody.promotionalCode).toEqual(testOrder.promotionalCode);
  });
});
