import AWS from 'aws-sdk';
import { Body } from 'aws-sdk/clients/s3';

export async function uploadToS3(filename: string, content: Body) {
  const credentials = new AWS.Credentials({
    accessKeyId: process.env.X_ACCESS_KEY_ID!,
    secretAccessKey: process.env.X_SECRET_ACCESS_KEY!,
  });
  AWS.config.credentials = credentials;

  console.info(`Uploading file to S3. filename=${filename}`);
  const s3 = new AWS.S3({ apiVersion: '2006-03-01', credentials: credentials });

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.X_BUCKET_NAME!,
    Key: filename,
    Body: content,
    ContentType: 'application/json',
  };

  await s3
    .putObject(params)
    .promise()
    .then(data => console.info('Successfully uploaded to S3:', data))
    .catch(error => console.error('Could not upload to S3:', error));
}
