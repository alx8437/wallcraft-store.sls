import axios from 'axios';
import { PromotionalCode } from '@models/PromotionalCode';
import { checkPromotionalCode, createPromotionalCodes, getPromotionalCodes } from './handler';
import { PromotionalCodeManager } from './promotional-code.manager';

describe('(Unit test)Promotional code module', () => {
  test('Create promotional codes', async () => {
    const codes: PromotionalCode[] = [
      { code: 'wl10', discountPercentage: 10 },
      { code: 'wl20', discountPercentage: 20 },
      { code: 'wl30', discountPercentage: 30 },
    ];
    const data = await createPromotionalCodes({ body: codes });
    expect(data).toEqual({ Responses: {}, UnprocessedItems: {} });
  });

  test('Check promotional code', async () => {
    const code = 'wl20';
    const data = await checkPromotionalCode({ query: { code } });
    expect(data?.discountPercentage).toBe(20);
  });

  test('Get promotional codes', async () => {
    const data = await getPromotionalCodes({});
    expect(data!.length).toBe(3);
  });

  test('Validation code', async () => {
    const promotionalCodeManager = new PromotionalCodeManager();
    try {
      await promotionalCodeManager.checkCode('');
    } catch (error) {
      expect(error).toEqual({ message: 'Promotional code does not exist!' });
    }
  });
});

describe('(Integration test) Promotional code module', () => {
  test('Create list codes and check', async () => {
    await axios({
      url: 'http://localhost:3000/api/promotional-code',
      method: 'post',
      data: [
        { code: 'wl10', discountPercentage: 10 },
        { code: 'wl20', discountPercentage: 20 },
      ],
      headers: { 'Content-Type': 'application/json' },
    });

    const { data } = await axios({
      url: 'http://localhost:3000/api/promotional-code/check',
      method: 'get',
      params: { code: 'wl10' },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(data.discountPercentage).toBe(10);
  });

  test('Check of a nonexistent promotional code', async () => {
    const { data } = await axios({
      url: 'http://localhost:3000/api/promotional-code/check',
      method: 'get',
      params: { code: 'nonexistent' },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(data).toEqual({});
  });
});
