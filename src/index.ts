import { APIGatewayEvent } from 'aws-lambda';

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

  uploadToS3();
  
  const response = {
      statusCode: 200,
      body: JSON.stringify('Success'),
  };
  return response;
};

function uploadToS3() {
  console.info('Upload to S3…');
}


interface Message {
  from: string;
  subject: string;
  receivedOn: string;
  text: string;
  html: string;
}