import axios from 'axios';
import { AuthService } from '@services/auth.service';

export class CategoryManager {

  async getCategories() {
    const authService = new AuthService();
    const response = await axios({
      url: 'https://api.shutterstock.com/v2/images/categories',
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: authService.getToken(),
      },
    });

    return response.data;
  }
}
