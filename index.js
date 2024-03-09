const express = require('express');
const app = express();

const PORT = 3001;

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "John Doe", number: "050-987654" },
  { id: 3, name: "John Cena", number: "050-95434354455" },
  { id: 4, name: "Pertti Mäki", number: "050-982344235" }
];

app.use(express.json());

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const requestTime = new Date();
  const numberOfPersons = persons.length;
  res.send(`<p>Phonebook has info for ${numberOfPersons} people</p><p>${requestTime}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
