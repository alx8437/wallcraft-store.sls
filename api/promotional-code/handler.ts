import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { PromotionalCodeModel } from '@models/PromotionalCode';

export async function getPromotionalCodes(event) {
  log('get-promotional-code', event);

  try {
    const listCode = await PromotionalCodeModel
      .scan().exec();

    return { status: 1, data: listCode };
  } catch (error) {
    errorHandler(error);
  }
}

export async function createPromotionalCodes(event) {
  log('create-promotional-code', event);

  try {
    const listCodes = event.body;
    const requestData = await PromotionalCodeModel.batchPut(listCodes);

    return { status: 1, data: requestData };
  } catch (error) {
    errorHandler(error);
  }
}

export async function checkPromotionalCode(event) {
  log('check-promotional-code');

  try {
    const codeName = event.path.code;
    const requestData = await PromotionalCodeModel.queryOne({ code: codeName }).exec();

    if (!requestData) {
      return { status: 0, data: requestData };
    } else {
      return { status: 1, data: requestData };
    }
  } catch (error) {
    errorHandler(error);
  }
}
