import * as dynamoose from 'dynamoose';
import { connectLocalDB } from '@services/db-loclal.config';
connectLocalDB(dynamoose);

export interface PromotionalCodeBody {
  code: string;
  discountPercentage: number;
}

export class PromotionalCode implements PromotionalCodeBody {
  public code: string;
  public discountPercentage: number;
}

export const PromotionalCodeSchema = new dynamoose.Schema({
  code: {
    type: String,
    hashKey: true,
  },
  discountPercentage: {
    type: Number,
  },
});

export const PromotionalCodeModel = dynamoose.model<PromotionalCodeBody, string>(
  'PromotionalCode',
  PromotionalCodeSchema,
);
