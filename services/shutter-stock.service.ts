import axios from 'axios';

const user = '8c9a2-ad787-0615e-57271-3ec59-5fcb5';
const secret = 'f5a56-881b3-5ad95-ac681-eaeb6-f2faf';
const token = 'Basic ' + Buffer.from(`${user}:${secret}`, 'utf8').toString('base64');
const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export class ShutterStockService {
  async getProducts(params) {
    const { data } = await axios({
      headers,
      url: 'https://api.shutterstock.com/v2/images/search',
      method: 'get',
      params: { ...params },
    });
    return data;
  }

  async getCategories() {
    const { data } = await axios({
      headers,
      url: 'https://api.shutterstock.com/v2/images/categories',
      method: 'get',
    });
    return data;
  }
}
