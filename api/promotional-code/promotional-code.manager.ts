import { PromotionalCodeModel } from '@models/PromotionalCode';

export class PromotionalCodeManager {

  async checkCode(code: string) {
    if (code) {
      const data = await PromotionalCodeModel.queryOne({ code }).exec();
      return data ? { data, status: 1 } : { status: 0 };
    }
  }
}
