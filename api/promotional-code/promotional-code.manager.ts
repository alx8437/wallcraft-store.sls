import { PromotionalCodeModel } from '@models/PromotionalCode';

export class PromotionalCodeManager {

  async checkCode(code: string) {
    if (!code) {
      throw { message: 'Promotional code does not exist!' };
    }

    return await PromotionalCodeModel.queryOne({ code }).exec();
  }
}
