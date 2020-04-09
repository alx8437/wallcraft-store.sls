import * as dynamoose from 'dynamoose';
import * as uuid from 'node-uuid';
import { PromotionalCode } from '@models/PromotionalCode';

dynamoose.AWS.config.update({
  accessKeyId: 'local',
  secretAccessKey: 'local',
  region: 'us-east-1',
});
dynamoose.local(`${process.env.DB_URL}`);

export interface OrderBody {
  id: string;
  clientId: string;
  date: Date;
  products: string[];
  fullPrice: number;
  activatedPromotionalCode: boolean;
  promotionalCode?: PromotionalCode;
  promotionalCodeId?: string;
}

export class Order implements OrderBody {
  public id: string;
  public clientId: string;
  public date: Date;
  public products: string[];
  public fullPrice: number;
  public activatedPromotionalCode: boolean;
  public promotionalCode?: PromotionalCode;
  public promotionalCodeId?: string;
}

export const OrderSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuid.v4,
  },
  clientId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: {
    type: [String],
  },
  fullPrice: {
    type: Number,
  },
  activatedPromotionalCode: {
    type: Boolean,
  },
  promotionalCodeId: {
    type: String,
  },
});

export const OrderModel = dynamoose.model<OrderBody, string>('Order', OrderSchema);
