import axios from 'axios';
import { getCategories } from './handler';

describe('(Unit test) Category module', () => {
  test('Get category', async () => {
    const { data } = await getCategories({});
    expect(data.length > 0).toBe(true);
  });
});

describe('(Integration test) Category module', () => {
  test('Get category', async () => {
    const { data: { data } } = await axios({
      method: 'get',
      url: 'http://localhost:3000/api/categories',
    });

    expect(data.length > 0).toBe(true);
  });
});
