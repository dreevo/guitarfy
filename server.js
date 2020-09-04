const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");
const mongoose = require("mongoose");

app.use(expressLayouts);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

const dbUri =
  "mongodb+srv://net-dreevo:7eTCOpbv9FfMxgb2@cluster0.1wky3.mongodb.net/node-auth";
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000));
const db = mongoose.connection;
db.on("error", (err) => console.error(error));

app.use(indexRoute);
