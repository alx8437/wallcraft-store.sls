import { getProducts } from './handler';

describe('Product module', () => {
  test('Get product', async () => {
    const params = { category: 1, page: 1, per_page: 10, query: '', view: 'full' };
    const response = await getProducts({ query: params });

    expect(response.data.length).toBe(10);
  });
});
