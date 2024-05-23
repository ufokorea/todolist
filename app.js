const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const indexRouter = require('./routes/index')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api",indexRouter);
const mongoURI='mongodb://localhost:27017/todo-demo';
mongoose.connect(mongoURI).then(()=> console.log("mongoos connect")).catch((err) => console.log("db fail",err));

app.listen(5000,()=>console.log("server is on 5000"));
