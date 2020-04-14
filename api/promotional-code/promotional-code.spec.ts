import { PromotionalCode } from '@models/PromotionalCode';
import { createPromotionalCodes } from './handler';

beforeAll(async () => {
});

describe('Module promotional code', () => {
  test('Create promotional codes', async () => {
    const codes: PromotionalCode[] = [
      { code: 'wl10', discountPercentage: 10 },
      { code: 'wl20', discountPercentage: 20 },
      { code: 'wl30', discountPercentage: 30 },
    ];
    const data = await createPromotionalCodes({ body: codes });

    expect(data).toBe({ Responses: {}, UnprocessedItems: {} });
  });

  test('Create promotional codes', () => {
    const codes: PromotionalCode[] = [
      { code: 'wl10', discountPercentage: 10 },
      { code: 'wl20', discountPercentage: 20 },
      { code: 'wl30', discountPercentage: 30 },
    ];
    createPromotionalCodes({ body: codes })
      .then(response => {

        expect(response).toBe({ Responses: {}, UnprocessedItems: {} });
      });
  });
});
