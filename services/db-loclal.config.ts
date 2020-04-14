export function connectLocalDB(dynamoose) {
  dynamoose.AWS.config.update({
    accessKeyId: 'local',
    secretAccessKey: 'local',
    region: 'us-east-1',
  });
  dynamoose.local(`${process.env.DB_URL ? process.env.DB_URL : 'http://localhost:8000'}`);
}
