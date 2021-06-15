import { APIGatewayEvent } from 'aws-lambda';
import { createHash } from 'crypto';
import { uploadToS3 } from './s3';

export const handler = async (event: APIGatewayEvent) => {
  console.log('Incoming event: ', event);
  
  if (!event.body) {
    console.error('No body attached');
    return { statusCode: 400 };
  }

  const decodedBody = Buffer.from(event.body, 'base64').toString('utf-8');
  console.info('Decoded body:', decodedBody);
  const message: Message = JSON.parse(decodedBody);
  console.info('Received message:', message);

  const expectedSender = 'turnkoenige@gmail.com';
  if (message.from !== expectedSender) {
    console.error(`Message is not from "${expectedSender}" but instead from "${message.from}"`);
    return { statusCode: 403 };
  }

  const filename = createHash('md5').update(message.subject).digest('hex');
  await uploadToS3(filename, JSON.stringify(message));
  
  const response = {
      statusCode: 200,
      body: JSON.stringify('Success'),
  };
  return response;
};


interface Message {
  from: string;
  subject: string;
  receivedOn: string;
  text: string;
  html: string;
}