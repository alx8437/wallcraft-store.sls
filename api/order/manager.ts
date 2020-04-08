import { ProductModel } from '@models/Product';
import { PromotionalCode, PromotionalCodeModel } from '@models/PromotionalCode';
import { errorHandler } from '@helper/error-handler';

export async function checkPromotionalCode(promotionalCode: PromotionalCode) {
  if (promotionalCode) {
    const code = await PromotionalCodeModel.scan({
      code: promotionalCode.code,
      discountPercentage: promotionalCode.discountPercentage,
    }).exec();

    if (code['count'] === 0) {
      errorHandler({ message: 'Promotional code does not exist!' });
    }
  }
}
