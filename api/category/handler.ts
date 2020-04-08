import { log } from '@helper/logger';
import { errorHandler } from '@helper/error-handler';
import { CategoryModel } from '@models/Category';

export async function getCategories(event) {
  log('get-category', event);

  try {
    const list = await CategoryModel.scan().exec();
    return { status: 1, data: list };
  } catch (error) {
    errorHandler(error);
  }
}

export async function createCategory(event) {
  log('create-category', event);

  try {
    const request = await CategoryModel.create(event.body);
    return { status: 'Ok', data: request };
  } catch (error) {
    errorHandler(error);
  }
}
