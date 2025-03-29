require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID;  
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = 'whatsapp:+14155238886';  // Twilio WhatsApp Number
const toNumber = 'whatsapp:+919620301639';  // Your WhatsApp Number

const client = new twilio(accountSid, authToken);

app.post('/send-whatsapp', (req, res) => {
    const { message } = req.body;

    client.messages
        .create({
            from: fromNumber,
            to: toNumber,
            body: message
        })
        .then(message => res.json({ success: true, messageId: message.sid }))
        .catch(error => res.json({ success: false, error }));
});

app.listen(3000, () => console.log('Server running on port 3000'));
