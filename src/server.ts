import express from 'express';
import payload from 'payload';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET_KEY,
    mongoURL: process.env.MONGO_URL,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.get('/health', (_, res) => {
    res.sendStatus(200);
  });

  const PORT = process.env.PORT || 3000;

	app.listen(PORT);
}

start();
