import axios from 'axios';
import { getProducts } from './handler';

describe('(Unit test)Product module', () => {
  test('Get product', async () => {
    const params = { category: 1, page: 1, per_page: 10, query: '', view: 'full' };
    const { data } = await getProducts({ query: params });

    expect(data.length).toBe(params.per_page);
  });
});

describe('(Integration test) Product module', () => {
  test('Get product', async () => {
    const params = { category: 1, page: 1, per_page: 10, query: '', view: 'full' };
    const { data: { data } } = await axios({
      params,
      url: 'http://localhost:3000/api/product',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(data.length).toBe(params.per_page);
  });
});
