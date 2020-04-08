import { errorHandler } from '@helper/error-handler';
import { Product, ProductModel } from '@models/Product';
import { log } from '@helper/logger';

export async function getProducts(event) {
  log('get-products', event);

  try {
    const parameters = event.query;
    const products = await ProductModel.scan().exec();
    return { status: 1, data: products };
  } catch (error) {
    errorHandler(error);
  }
}

export async function createProducts(event) {
  log('create-products', event);
  try {
    const listProducts: Product[] = event.body;
    const requestData = await ProductModel.batchPut(listProducts);

    return { status: 1, data: requestData };
  } catch (error) {
    errorHandler(error);
  }
}
