import * as dynamoose from 'dynamoose';

dynamoose.AWS.config.update({
  accessKeyId: 'local',
  secretAccessKey: 'local',
  region: 'us-east-1',
});
dynamoose.local(`${process.env.DB_URL}`);

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
