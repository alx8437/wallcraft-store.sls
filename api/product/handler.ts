import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { ProductManager } from './product.manager';

export async function getProducts(event) {
  log('get-products', event);

  try {
    const params = event.query;
    const productManager = new ProductManager();
    return await productManager.getProducts(params);
  } catch (error) {
    errorHandler(error);
  }
}
