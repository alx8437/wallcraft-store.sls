import { PromotionalCode } from '@models/PromotionalCode';
import { checkPromotionalCode, createPromotionalCodes, getPromotionalCodes } from './handler';

beforeAll(async () => {
});

describe('Promotional code module', () => {
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

  test('Get promotional code', async () => {
    const data = await getPromotionalCodes({});
    expect(data!.length).toBe(3);
  });
});
