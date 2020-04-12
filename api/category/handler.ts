import { log } from '@helper/logger';
import { errorHandler } from '@helper/error-handler';
import { CategoryManager } from './category.manager';

export async function getCategories(event) {
  log('get-category', event);

  try {
    const categoryManager = new CategoryManager();
    return await categoryManager.getCategories();
  } catch (error) {
    errorHandler(error);
  }
}
