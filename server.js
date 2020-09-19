const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/indexRoute");
const brandRoute = require("./routes/brandRoute");
const guitarRoute = require("./routes/guitarRoute");
const authRoutes = require("./routes/authRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { DB_URI } = require("./dbFiles/keys");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");
const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(PORT));
const db = mongoose.connection;
db.on("error", (err) => console.error(error));

app.get("*", checkUser);
app.use("/", indexRoute);
app.use("/brands", brandRoute);
app.use("/guitars", guitarRoute);
app.use(authRoutes);
