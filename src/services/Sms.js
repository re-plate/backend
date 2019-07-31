import client from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SENDER_NUMBER,
  NODE_ENV,
} = process.env;

const twilioClient = client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendMessage = (phone, message) => {
  if (NODE_ENV === 'production') {
    twilioClient.messages
      .create({
        body: message,
        from: TWILIO_SENDER_NUMBER,
        to: phone,
      })
      .then(res => res);
  }
};

export default sendMessage;
