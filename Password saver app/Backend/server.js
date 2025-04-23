import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();

dotenv.config();

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'passop';
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB and start the server
client.connect().then(() => {
  const db = client.db(dbName);
  
  app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });

  app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.insertOne(password);
    res.send({ success: true, result: insertResult });
  });

  app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteResult = await collection.deleteOne(password); // Assuming password is the field to match
    res.send({ success: true, result: deleteResult });
  });

  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
