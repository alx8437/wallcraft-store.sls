import { errorHandler } from '@helper/error-handler';
import { Product, ProductModel } from '@models/Product';
import { log } from '@helper/logger';

export async function getProducts(event) {
  log('get-products', event);

  try {
    const parameters = event.query;
    const indexEnd = parameters.page * parameters.per_page;
    const indexStart = indexEnd - parameters.per_page;

    let products = await ProductModel.scan({ categoryId: parameters.category }).exec();
    let newProducts: Product[] = [];

    if (parameters.keywords) {
      products.forEach((product) => {
        if (product.keywords.includes(parameters.keywords)) {
          newProducts.push(product);
        }
      });
    } else {
      newProducts = products;
    }

    newProducts = newProducts.slice(indexStart, indexEnd);

    return { status: 1, count: newProducts.length, data: newProducts };
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
