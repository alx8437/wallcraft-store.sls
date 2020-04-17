import axios from 'axios';
import { PromotionalCode, PromotionalCodeModel } from '@models/PromotionalCode';
import { checkPromotionalCode, createPromotionalCodes, getPromotionalCodes } from './handler';

const codes: PromotionalCode[] = [
  { code: 'wl10', discountPercentage: 10 },
  { code: 'wl20', discountPercentage: 20 },
  { code: 'wl30', discountPercentage: 30 },
];

beforeEach(async () => {
  await PromotionalCodeModel.batchPut(codes);
});
afterEach(async () => {
  for (const { code } of codes) {
    await PromotionalCodeModel.delete(code);
  }
});

describe('(Unit test)Promotional code module', () => {
  test('Create promotional codes', async () => {
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
    try {
      await checkPromotionalCode({ query: { code: '' } });
    } catch (error) {
      expect(error).toMatch('Promotional code does not exist!');
    }
  });

  test('Create codes with wrong params', async () => {
    const codes = [{ code: 100, discountPercentage: 'text' }];
    try {
      await createPromotionalCodes({ body: codes });
    } catch (error) {
      expect(error).toMatch('[400]');
    }
  });
});

describe('(Integration test) Promotional code module', () => {
  test('Create list codes and check', async () => {
    await axios({
      url: 'http://localhost:3000/api/promotional-codes',
      method: 'post',
      data: codes,
    });

    const { data } = await axios({
      url: 'http://localhost:3000/api/promotional-codes/check',
      method: 'get',
      params: { code: 'wl10' },
    });

    expect(data.discountPercentage).toBe(10);
  });

  test('Check of a nonexistent promotional code', async () => {
    const { data } = await axios({
      url: 'http://localhost:3000/api/promotional-codes/check',
      method: 'get',
      params: { code: 'nonexistent' },
    });

    expect(data).toEqual({});
  });
});
