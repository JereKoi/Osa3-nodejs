const express = require('express');
const app = express();

const PORT = 3001;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
