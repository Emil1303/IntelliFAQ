import { google } from "googleapis";
import { collection } from "firebase/firestore";

import express from "express";
const googleRouter = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID_TEST,
    process.env.GMAIL_CLIENT_SECRET_TEST,
    process.env.GMAIL_API_REDIRECT_URI_TEST
);

googleRouter.get('/googleAuth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/gmail.readonly'
    });
    res.send({ url });
})

googleRouter.get('/getMail', async (req, res) => {
    try {
        const gmail = google.gmail({ version: "v1", auth: oauth2Client });
        const emailList = await gmail.users.messages.list({ userId: "me" });
        const lastEmailId = emailList.data.messages[0].id;
        const lastEmail = await gmail.users.messages.get({ userId: "me", id: lastEmailId });
        const subject = lastEmail.data.payload.headers.find(header => header.name === "Subject").value;
        const from = lastEmail.data.payload.headers.find(header => header.name === "From").value;
        const body = lastEmail.data.payload.body.data;
        res.send({ subject, from, body });
    }
    catch (error) {
        return res.json({aa: 'SignIn first'});
    }
})

googleRouter.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    
    oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3000');
})

export default googleRouter;