import axios from 'axios';
import { AuthService } from '@services/auth.service';

export class ProductManager {

  async getProducts(params) {
    const authService = new AuthService();
    const response = await axios({
      url: 'https://api.shutterstock.com/v2/images/search',
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: authService.getToken(),
      },
      params: {
        ...params,
      },
    });

    return response.data;
  }
}
