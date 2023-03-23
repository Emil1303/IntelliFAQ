import {google} from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID_TEST,
    process.env.GMAIL_CLIENT_SECRET_TEST,
    process.env.GMAIL_API_REDIRECT_URI_TEST
);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail'
});

const {tokens} = await oauth2Client.getToken(code)
oauth2Client.setCredentials(tokens);