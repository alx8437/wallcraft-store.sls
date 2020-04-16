import { ShutterStockService } from '@services/shutter-stock.service';

export class ProductManager {

  async getProducts(params) {
    const shutterStockService = new ShutterStockService();
    return await shutterStockService.getProducts(params);
  }
}
