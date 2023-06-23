const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mealRouter = require("./routes/mealRoutes");
const menuRouter = require("./routes/menuRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require('cookie-parser')

const app = express();

// Enable CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())

// Router
app.use("/api/meals", mealRouter);
app.use("/api/menus", menuRouter);
app.use("/api/users", userRouter);

module.exports = app;
