import { PromotionalCodeModel } from '@models/PromotionalCode';

export class PromotionalCodeManager {

  async checkCode(code: string) {
    if (!code) {
      throw { message: `Promotional code does't exist!` };
    }

    return await PromotionalCodeModel.queryOne({ code }).exec();
  }
}
