import AWS from 'aws-sdk';
import { Body } from 'aws-sdk/clients/s3';


export function uploadToS3(filename: string, content: Body) {
  AWS.config.credentials = new AWS.Credentials({accessKeyId: process.env.X_ACCESS_KEY_ID!, secretAccessKey: process.env.X_SECRET_ACCESS_KEY! });
  AWS.config.update({region: process.env.X_REGION});

  console.info(`Uploading file to S3. filename=${filename}`);
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});

  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'turnkoenige',
    Key: filename,
    Body: content,
  };
  
  s3.upload(params, (error) => {
    if (error) {
      console.error('Error:', error);
    }
  });
}