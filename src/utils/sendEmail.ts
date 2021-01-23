import sgMail from '@sendgrid/mail';

export default async ({
  to,
  subject,
  html,
}:{
  to: string,
  subject: string,
  html: string,
}) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const msg = {
    to,
    from: process.env.EMAIL || '',
    subject,
    html,
  };

  return sgMail.send(msg);
};
