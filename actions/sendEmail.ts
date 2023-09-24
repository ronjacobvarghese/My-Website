"use server"

import { Resend } from 'resend';


export default async function sendEmail(formData: FormData) {

  const resend = new Resend('re_RsiXfzqE_2rTzRXermSHBVu3DPhuUmRzz');
  
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ronjacob23@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });
}

