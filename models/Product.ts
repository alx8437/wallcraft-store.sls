import * as dynamoose from 'dynamoose';
import * as uuid from 'node-uuid';

dynamoose.AWS.config.update({
  accessKeyId: 'local',
  secretAccessKey: 'local',
  region: 'us-east-1',
});
dynamoose.local(`${process.env.DB_URL}`);

export interface ProductBody {
  id: string;
  categoryId: string;
  image: string;
  keywords: string[];
  description: string;
  price: number;
}

export class Product implements ProductBody {
  public id: string;
  public categoryId: string;
  public image: string;
  public keywords: string[];
  public description: string;
  public price: number;
}

export const ProductSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuid.v4,
  },
  categoryId: {
    type: String,
  },
  image: {
    type: String,
  },
  keywords: {
    type: [String],
    default: () => [],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

export const ProductModel = dynamoose.model<ProductBody, string>('Product', ProductSchema);
