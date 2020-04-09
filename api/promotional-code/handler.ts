import { errorHandler } from '@helper/error-handler';
import { PromotionalCodeModel } from '@models/PromotionalCode';

export async function getPromotionalCodes(event) {
  try {
    const responseData = await PromotionalCodeModel.scan().exec();
    return { status: 1, data: responseData };
  } catch (error) {
    errorHandler(error);
  }
}

export async function createPromotionalCodes(event) {
  try {
    const codes = event.body;
    const responseData = await PromotionalCodeModel.batchPut(codes);

    return { status: 1, data: responseData };
  } catch (error) {
    errorHandler(error);
  }
}

export async function checkPromotionalCode(event) {
  try {
    const codeName = event.path.code;
    const responseData = await PromotionalCodeModel.queryOne({ code: codeName }).exec();

    if (!responseData) {
      return { status: 0, data: responseData };
    } else {
      return { status: 1, data: responseData };
    }
  } catch (error) {
    errorHandler(error);
  }
}
