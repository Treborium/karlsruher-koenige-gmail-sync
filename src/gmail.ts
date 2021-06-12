import { Inbox, Message } from 'gmail-inbox';

export async function fetchMails(): Promise<Message[]> {
  const inbox = new Inbox('credentials.json');
  await inbox.authenticateAccount();
  
  const searchFilter = 'from:Turn Koenige <turnkoenige@gmail.com> newer_than:1d';
  const messages = await inbox.findMessages(searchFilter);
  console.info(`Fetched ${messages.length} messages.`);

  return messages;
}