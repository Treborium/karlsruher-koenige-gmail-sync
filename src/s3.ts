import AWS from 'aws-sdk';
import { Body } from 'aws-sdk/clients/s3';

AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
AWS.config.update({region: 'eu-central-1'});  // eu-central-1 = Frankfurt

export function uploadToS3(filename: string, content: Body) {
  console.info(`Uploading file to S3. filename=${filename} content=${content}`);
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