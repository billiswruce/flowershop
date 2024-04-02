const express = require("express");
// require("dotenv").config();
const colors = require("colors");

const app = express();

console.log(process);

app.listen(300, () => console.log("Server is running🌷".rainbow.bold));
