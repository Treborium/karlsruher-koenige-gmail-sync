import { Inbox, Message } from 'gmail-inbox';

export async function fetchMails(): Promise<Message[]> {
  const inbox = new Inbox('credentials.json');
  await inbox.authenticateAccount();
  
  const searchFilter = 'from:Turn Koenige <turnkoenige@gmail.com>';
  const messages = await inbox.findMessages(searchFilter);
  console.info('First three messages:', JSON.stringify(messages.slice(0, 3), null, 4));

  return messages;
}