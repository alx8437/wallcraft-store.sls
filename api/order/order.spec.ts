import axios from 'axios';
import { createOrder, getOrdersForClient } from './handler';
import { PromotionalCode } from '@models/PromotionalCode';
import { OrderManager } from './order.manager';
import { Order } from '@models/Order';

const testOrder = {
  clientId: '2b68d63-1b75-4a90-be91-fe77fb90ff46',
  date: new Date(),
  products: [{
    id: 1177724560,
    image: 'https://image.shutterstock.com/display_pic_with_logo/187633/1177724560/stock-photo-young-boy-and-girl-at-school-lunch-table-smiling-to-camera-1177724560.jpg',
    description: 'Young boy and girl at school lunch table smiling to camera',
    price: 240,
    keywords: ['incidental people', 'pupils', 'two people', 'lunch', 'education', 'caucasian', 'happy', 'multi-ethnic group', 'looking at camera', 'school boy', 'youth', 'focus on foreground', 'horizontal', 'children', 'copy space', 'sitting at table', 'day', 'smiling', 'waist up', 'healthy eating', 'girl', 'schoolchildren', 'elementary school', 'breakfast', 'school kids', 'pre-teens', 'african american ethnicity', 'lunch break', 'boy', 'primary school', 'selective focus', 'apple', 'diversity', 'mixed race person', 'indoors', 'schoolgirl', 'kids', 'close up', 'childhood', 'food and drink', 'black', 'packed lunch', 'dinner break', 'meal', 'lunchbox', 'sunlight', 'japanese ethnicity', 'classmates', 'window'],
  }, {
    id: 1177724494,
    image: 'https://image.shutterstock.com/display_pic_with_logo/187633/1177724494/stock-photo-young-school-kids-eating-lunch-talking-at-a-table-together-1177724494.jpg',
    description: 'Young school kids eating lunch talking at a table together',
    price: 240,
    keywords: ['incidental people', 'pupils', 'lunch', 'education', 'friendship', 'front view', 'caucasian', 'happy', 'multi-ethnic group', 'boys', 'girls', 'youth', 'horizontal', 'children', 'school', 'copy space', 'sitting at table', 'communication', 'day', 'smiling', 'waist up', 'healthy eating', 'friends', 'schoolchildren', 'elementary school', 'vietnamese ethnicity', 'breakfast', 'school kids', 'pre-teens', 'holding sandwich', 'african american ethnicity', 'lunch break', 'three people', 'primary school', 'selective focus', 'apple', 'looking at each other', 'mixed race person', 'schoolboys', 'kids', 'close up', 'childhood', 'food and drink', 'dinner break', 'eating', 'schoolgirls', 'meal', 'lunchbox', 'outdoors', 'classmates'],
  }],
  fullPrice: 480,
  activatedPromotionalCode: false,
  promotionalCode: {},
};

describe('(Unit test)Order module', () => {
  test('Create order', async () => {
    const data = await createOrder({ body: testOrder });
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
      await orderManager.validationPromotionalCode(order);
    } catch (error) {
      expect(error).toEqual({ message: 'Promotional code does not exist!' });
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
      headers: { 'Content-Type': 'application/json' },
    });
    const orderBody = createOrder.data;

    expect(orderBody.promotionalCode).toEqual(testOrder.promotionalCode);
  });
});
