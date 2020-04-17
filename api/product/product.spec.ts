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
      url: 'http://localhost:3000/api/products',
      method: 'get',
    });

    expect(data.length).toBe(params.per_page);
  });

  // test('Get product with wrong params', async () => {
  //   const params = { category: -1, page: 1, per_page: 'number', query: '', view: 'full' };
  //   const { data: { data } } = await axios({
  //     params,
  //     url: 'http://localhost:3000/api/products',
  //     method: 'get',
  //   });
  //   console.log(data);
  //   expect(true).toBe(true);
  // });
});
