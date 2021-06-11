import { Inbox } from 'gmail-inbox';

async function fetchMails(){
  const inbox = new Inbox('credentials.json');
  await inbox.authenticateAccount(); // logs user in
  
  const messages = await inbox.findMessages('from:Turn Koenige <turnkoenige@gmail.com>');

  console.log("my inbox messages", JSON.stringify(messages.slice(0, 3),null,4));
}

fetchMails();