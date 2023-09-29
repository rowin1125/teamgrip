import * as nodemailer from 'nodemailer';
import * as Sib from 'sib-api-v3-sdk';

type MailToType = {
    name: string;
    email: string;
};
type MailSenderType = {
    name: string;
    email: string;
};
type MailUserOptions = {
    sender?: MailSenderType;
    to: MailToType[];
    templateId?: number;
    params?: Record<string, string>;
};

export async function mailUser(options: MailUserOptions) {
    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY?.toString();

    const transEmailApi = new Sib.TransactionalEmailsApi();

    const emailOptions = {
        ...options,
        sender: options.sender ?? {
            name: 'Rowin Mol',
            email: 'rowinmol648@gmail.com',
        },
    };

    return transEmailApi
        .sendTransacEmail(emailOptions)
        .then(() => {
            emailOptions.to.forEach((mailTo) =>
                console.log(`Email sent to ${mailTo.email}`)
            );
        })
        .catch((err) => {
            console.error('err', err);
        });
}

interface Options {
    to: string | string[];
    subject: string;
    text?: string;
    html: string;
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
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'Rowin van TeamGrip < rowinmol648@gmail.com',
        to: Array.isArray(to) ? to : [to], // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    return info;
}
