import * as dynamoose from 'dynamoose';
import * as uuid from 'node-uuid';

dynamoose.AWS.config.update({
  accessKeyId: 'local',
  secretAccessKey: 'local',
  region: 'us-east-1',
});
dynamoose.local(`${process.env.DB_URL}`);

export interface ClientBody {
  id: string;
}

export class Client implements ClientBody {
  public id: string;
}

export const ClientSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuid.v4,
  },
});

export const ClientModel = dynamoose.model('Client', ClientSchema);
