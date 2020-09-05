const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/indexRoute");
const brandRoute = require("./routes/brandRoute");
const guitarRoute = require("./routes/guitarRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { dbUri } = require("./dbFiles/dbCredentials");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000));
const db = mongoose.connection;
db.on("error", (err) => console.error(error));

app.use("/", indexRoute);
app.use("/brands", brandRoute);
app.use("/guitars", guitarRoute);
