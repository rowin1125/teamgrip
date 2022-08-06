import * as nodemailer from 'nodemailer'

const Sib = require('sib-api-v3-sdk')

export async function mailUser() {
  const client = Sib.ApiClient.instance

  const apiKey = client.authentications['api-key']
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY.toString()
  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sendSmtpEmailOptions = {
    sender: {
      email: 'rowinmol648@gmail.com',
    },
    to: [
      {
        email: 'rowinmol648@gmail.com',
        name: 'Rowin Mol',
      },
    ],
    templateId: 1,
    params: {
      firstname: 'Rowin',
      activateUrl: 'https://www.google.com',
    },
  }

  tranEmailApi
    .sendTransacEmail(sendSmtpEmailOptions)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.message)
      console.log(err.status)
    })
}

interface Options {
  to: string | string[]
  subject: string
  text?: string
  html: string
}
export async function sendEmail({ to, subject, text, html }: Options) {
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rowinmol648@gmail.com',
      pass: process.env.SENDINBLUE_SMTP_KEYS,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Rowin van TeamStats < rowinmol648@gmail.com',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}
