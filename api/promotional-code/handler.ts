import { errorHandler } from '@helper/error-handler';
import { PromotionalCodeModel } from '@models/PromotionalCode';
import { PromotionalCodeManager } from './promotional-code.manager';

export async function createPromotionalCodes(event) {
  try {
    const codes = event.body;
    return await PromotionalCodeModel.batchPut(codes);
  } catch (error) {
    errorHandler(error);
  }
}

export async function getPromotionalCodes(event) {
  try {
    return await PromotionalCodeModel.scan().exec();
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
