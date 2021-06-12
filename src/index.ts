import { fetchMails } from "./gmail";
import { uploadToS3 } from "./s3";
import { createHash } from 'crypto';

interface FileContent {
  title: string;
  content: string;
  date?: string;
  preview?: string;
}

async function convertMailToFile() {
  const mails = await fetchMails();
  const files: FileContent[] = mails.filter(mail => (mail.subject && mail.body.text)).map(mail => (
    {
      title: mail.subject!,
      content: mail.body.text!,
      date: mail.receivedOn,
      preview: mail.snippet,
    }
  ));

  
  files.forEach(file => {
    const name = createHash('md5').update(file.title).digest('hex');
    uploadToS3(name, JSON.stringify(file));
  });
}

convertMailToFile();

