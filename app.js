//IMPORT EXPRESS
const express = require("express");

//DEFINE A PORT
const PORT = 8080;

// INSTANCIATE EXPRESS
const app = express();

//MORGAN IS USED TO LOG (in the server terminal) THE REQUESTS RECEIVED IN THE SERVER
const logger = require("morgan");

//USING MORGAN TO LOG REQUESTS
app.use(logger("dev"));

//PARSES ANY INCOMING JSON
//will be used when we have POST requests
app.use(express.json());

//IMPORT db.json file DATA
//this is MOCK / HARD CODED, we will have a MongoDB database soon...
const data = require("./db.json");

//GET /  just sends a response as a JSON Object with a message property, containing a string
app.get("/", async (req, res) => {
  res.json({
    message:
      "Hello everyone, we're in the empty / route, now sending JSON response",
  });
});

//GET /hello/greeting just sends a response as a string, which will be interpreted as HTML
app.get("/hello/greeting", (req, res) => {
  res.send("Hi guys! we have a server and this is the /hello route. HELLO!!");
});

//GET /about just sends a response as a string, which will be interpreted as HTML
app.get("/about", (req, res) => {
  res.send("<h2>This is the /about route, there's not much else to it</h2>");
});

//GET /jsonData defines a javascript object, sends that in the response as JSON
app.get("/jsonData", (req, res) => {
  const personObj = {
    name: "Yamil",
    age: 25,
    country: "Puerto Rico",
  };

  res.json(personObj);
});

//GET /peopleArray sends the data imported at the top as a json array/object

app.get("/peopleArray", (req, res) => {
  res.json(data);
});

//GET /people/:personId gets a REQUEST PARAMETER (req.params)
//and we use that parameter to find a person with the corresponding ID
app.get("/people/:personId", (req, res) => {
  const { personId } = req.params;

  const singlePerson = data.find((person) => person.id.toString() === personId);

  if (!singlePerson) {
    res.json({ message: "There is no one with this ID" });
  }

  res.json(singlePerson);
});

//this is what makes the server RUN and stay ON
//listens to the provided PORT variable
app.listen(PORT, () => {
  console.clear();
  console.log("Server is running on port " + PORT);
});
