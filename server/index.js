import express from 'express';
import cors from 'cors';

import './db/database.js';

import { contactMessagesRouter } from './routes/contactMessages.js';
import { ticketRequestsRouter } from './routes/ticketRequests.js';
import { playersRouter } from './routes/players.js';

const app = express();

const PORT = 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'VR CONCEPT FC API is running',
  });
});

app.use('/api/contact-messages', contactMessagesRouter);
app.use('/api/ticket-requests', ticketRequestsRouter);
app.use('/api/players', playersRouter);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Маршрут не найден',
  });
});

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
