const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

const PORT = process.env.PORT || 8000;

const app = express();

let records = [{title: "Record1", content: "This is the first record"}, 
{title: "Record2", content: "This is the second record"}];

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/records', (req, res) => {
  try {
    res.status(200).json(records);
  }  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/records', (req, res) => {
  try {
    const newRecord = req.body;
    console.log(newRecord);
    records.push(newRecord);
    res.status(201).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/records/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    records = records.filter((record, index) => {
    return index !== id;
  });
  res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});