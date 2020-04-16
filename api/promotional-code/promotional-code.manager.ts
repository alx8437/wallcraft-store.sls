import { PromotionalCodeModel } from '@models/PromotionalCode';

export class PromotionalCodeManager {

  async checkPromotionalCode(code: string) {
    if (!code) {
      throw { message: 'Promotional code does not exist!' };
    }

    return await PromotionalCodeModel.queryOne({ code }).exec();
  }

  async createPromotionalCodes(codes) {
    return await PromotionalCodeModel.batchPut(codes);
  }

  async getPromotionalCodes() {
    return await PromotionalCodeModel.scan().exec();
  }
}
