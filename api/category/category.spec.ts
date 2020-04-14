import { getCategories } from './handler';

describe('Category module', () => {
  test('Get category', async () => {
    const { data } = await getCategories({});
    expect(data.length > 0).toBe(true);
  });
});
