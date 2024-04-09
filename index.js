require("dotenv").config(); // Load environment variables
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose

const app = express();
const PORT = process.env.PORT || 3001;
const url = process.env.MONGODB_URI;
console.log("Connecting to MongoDB:", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Define Person schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing or invalid id" });
  }

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).json({ error: "Malformatted id" });
  }

  next(error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
