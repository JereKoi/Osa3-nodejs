const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

// Mukautettu tokeni, joka palauttaa pyynnön tiedot JSON-muodossa
morgan.token('req-body', (req, res) => JSON.stringify(req.body));

// Käytä morgania ja aseta haluttu loggausformaatti
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

// Lisätään middleware, joka parsii requestin bodyn JSON-formaatista
app.use(express.json());

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "John Doe", number: "050-987654" },
  { id: 3, name: "John Cena", number: "050-95434354455" },
  { id: 4, name: "Pertti Mäki", number: "050-982344235" }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// Lisää uusi puhelintieto
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  // Generoidaan uniikki id
  const id = Math.floor(Math.random() * 1000000);
  const person = {
    id: id,
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
