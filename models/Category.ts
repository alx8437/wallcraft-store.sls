import * as dynamoose from 'dynamoose';
import * as uuid from 'node-uuid';

dynamoose.AWS.config.update({
  accessKeyId: 'local',
  secretAccessKey: 'local',
  region: 'us-east-1',
});
dynamoose.local(`${process.env.DB_URL}`);

export interface CategoryBody {
  id: string;
  name: string;
}

export class Category implements CategoryBody {
  public id: string;
  public name: string;
}

export const CategorySchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuid.v4,
  },
  name: {
    type: String,
  },
});

export const CategoryModel = dynamoose.model<CategoryBody, string>('Category', CategorySchema);
