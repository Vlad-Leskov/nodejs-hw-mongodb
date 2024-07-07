import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import env from './utils/evn.js';
import { getAllContacts, getContactById } from './services/contacts.js';
dotenv.config();

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        message: 'Sorry, but we don`t have such a student!',
      });
      return;
    }
    res.status(200).json({
      message: `Successfully found contact with id {contactId}!`,
      data: contact,
    });
  });

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  }),
    app.use((error, req, res) => {
      res.status(500).json({
        message: 'Something went wrong!',
        error: error.message,
      });
    });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
