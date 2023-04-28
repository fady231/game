const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const student = require("./routes/students");
const parents = require("./routes/parents");
const FSE = require("./routes/DaTa");
const data = require("./routes/dataRouter")
const Task = require("./routes/Task");

app.use(bodyParser.json());
app.use(cors());
app.use('/image',express.static(path.join('Image')));
app.use('/StudentProfilePic',express.static(path.join('StudentProfilePic')));
app.use('/Profile',express.static(path.join('Profile')));
app.use('/ParentProfilePic',express.static(path.join('ParentProfilePic')));
app.use("/student", student);
app.use("/parent", parents);
app.use("/FSE", FSE);
app.use("/Task", Task);
app.use("/data", data);



mongoose.connect(
 //"mongodb://localhost:27017",
 "mongodb+srv://ahmed:7IxlE70oZXGK8WVz@cluster0.urdmbgm.mongodb.net/questions?retryWrites=true&w=majority",
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to DB!")
);


app.listen(3000);
