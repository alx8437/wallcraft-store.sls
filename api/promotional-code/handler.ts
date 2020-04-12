import { errorHandler } from '@helper/error-handler';
import { PromotionalCodeModel } from '@models/PromotionalCode';
import { PromotionalCodeManager } from './promotional-code.manager';

export async function getPromotionalCodes(event) {
  try {
    const data = await PromotionalCodeModel.scan().exec();
    return { data, status: 1 };
  } catch (error) {
    errorHandler(error);
  }
}

export async function createPromotionalCodes(event) {
  try {
    const codes = event.body;
    const data = await PromotionalCodeModel.batchPut(codes);
    return { data, status: 1 };
  } catch (error) {
    errorHandler(error);
  }
}

export async function checkPromotionalCode(event) {
  try {
    const { code } = event.query;
    const promotionalCodeManager = new PromotionalCodeManager();
    return await promotionalCodeManager.checkCode(code);
  } catch (error) {
    errorHandler(error);
  }
}
