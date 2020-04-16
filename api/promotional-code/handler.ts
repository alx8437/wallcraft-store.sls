import { errorHandler } from '@helper/error-handler';
import { PromotionalCodeManager } from './promotional-code.manager';

export async function createPromotionalCodes(event) {
  try {
    const codes = event.body;
    const promotionalCodeManager = new PromotionalCodeManager();
    return await promotionalCodeManager.createPromotionalCodes(codes);
  } catch (error) {
    errorHandler(error);
  }
}

export async function getPromotionalCodes(event) {
  try {
    const promotionalCodeManager = new PromotionalCodeManager();
    return await promotionalCodeManager.getPromotionalCodes();
  } catch (error) {
    errorHandler(error);
  }
}

export async function checkPromotionalCode(event) {
  try {
    const { code } = event.query;
    const promotionalCodeManager = new PromotionalCodeManager();
    return await promotionalCodeManager.checkPromotionalCode(code);
  } catch (error) {
    errorHandler(error);
  }
}
