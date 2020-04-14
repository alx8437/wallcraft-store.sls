import * as dynamoose from 'dynamoose';
import * as uuid from 'node-uuid';
import { PromotionalCode } from '@models/PromotionalCode';
import { Product } from '@models/Product';
import { connectLocalDB } from '@services/db-loclal.config';
connectLocalDB(dynamoose);

export interface OrderBody {
  id: string;
  clientId: string;
  date: Date;
  products: Product[];
  fullPrice: number;
  activatedPromotionalCode: boolean;
  promotionalCode?: PromotionalCode;
}

export class Order implements OrderBody {
  public id: string;
  public clientId: string;
  public date: Date;
  public products: Product[];
  public fullPrice: number;
  public activatedPromotionalCode: boolean;
  public promotionalCode?: PromotionalCode;
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
    type: [Object],
  },
  fullPrice: {
    type: Number,
  },
  activatedPromotionalCode: {
    type: Boolean,
  },
  promotionalCode: {
    type: Object,
  },
});

export const OrderModel = dynamoose.model<OrderBody, string>('Order', OrderSchema);
