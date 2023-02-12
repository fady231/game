const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const student = require("./routes/students");
const parents = require("./routes/parents");
const FSE = require("./routes/FirstStadgeEn");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/FSEimage")));
app.use("/student", student);
app.use("/parent", parents);
app.use("/FSE", FSE);



mongoose.connect(
 //"mongodb://localhost:27017",
 "mongodb+srv://FADY:01030298360@cluster0.ovzea8j.mongodb.net/test",
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to DB!")
);


app.listen(3000);
