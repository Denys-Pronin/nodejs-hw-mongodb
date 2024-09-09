import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  //1) Створення серверу за допомогою виклику express()
  const app = express();

  app.use(express.json());

  //2) Налаштування cors
  app.use(cors());

  //2) Налаштування логгера pino
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
      message: 'Successgully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact no found',
      });
      return;
    }

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  });

  //3) Обробка неіснуючих роутів
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  //4) Запуск серверу
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
