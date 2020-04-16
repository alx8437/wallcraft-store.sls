import { ShutterStockService } from '@services/shutter-stock.service';

export class CategoryManager {

  async getCategories() {
    const shutterStockService = new ShutterStockService();
    return await shutterStockService.getCategories();
  }
}
