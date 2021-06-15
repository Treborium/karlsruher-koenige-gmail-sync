import { APIGatewayEvent } from 'aws-lambda';
import { createHash } from 'crypto';
import { uploadToS3 } from './s3';

export const handler = async (event: APIGatewayEvent) => {
  console.log('Incoming event: ', event);

  if (!event.body) {
    console.error('No body attached');
    return { statusCode: 400, body: 'No body attached' };
  }

  const message = parseBody(event.body);
  if (!message) {
    console.error('Invalid body');
    return { statusCode: 400, body: 'Could not parse body' };
  }

  const expectedSender = 'turnkoenige@gmail.com';
  if (message.from !== expectedSender) {
    console.error(
      `Message is not from "${expectedSender}" but instead from "${message.from}"`
    );
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

function parseBody(body: string): Message | undefined {
  const decodedBody = Buffer.from(body, 'base64').toString('utf-8');
  console.info('Decoded body:', decodedBody);
  try {
    const message: Message = JSON.parse(decodedBody);
    console.info('Received message:', message);
    return message;
  } catch (error) {
    console.error('Error while parsing body:', error);
  }

  return undefined;
}

interface Message {
  from: string;
  subject: string;
  receivedOn: string;
  text: string;
  html: string;
}
