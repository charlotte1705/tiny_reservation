const {google}= require('googleapis');
const nodemailer = require('nodemailer');

require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const ACCESS_TOKEN = process.env.ACCESS_TOKEN


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendMail = async() => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              type: "OAuth2",
              user: 'santanguyen462@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
            },
          });
          
          transporter.set("oauth2_provision_cb", (user, renew, callback) => {
            let accessToken = accessToken;
            if (!accessToken) {
              return callback(new Error("Unknown user"));
            } else {
              return callback(null, accessToken);
            }
          });
          
          transporter.sendMail({
            from: "sender@example.com",
            to: "recipient@example.com",
            subject: "Message",
            text: "I hope this message gets through!",
            auth: {
              user: "user@example.com",
            },
          });
          return;

        // const accessToken = await oAuth2Client.getAccessToken();
        const user = 'santanguyen462@gmail.com';
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: user,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
          transport.set("oauth2_provision_cb", (user, renew, callback) => {
            let accessToken = userTokens[user];
            if (!accessToken) {
              return callback(new Error("Unknown user"));
            } else {
              return callback(null, accessToken);
            }
          });
        // send email with defined transport object
        let info = await transport.sendMail({
            from: '"Tinyne" <santanguyen462@gmail.com>', // sender address
            to: "charlottenguyen1705@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
     console.log(info);
    } catch (error) {
        console.error(error);
    }
}


sendMail();