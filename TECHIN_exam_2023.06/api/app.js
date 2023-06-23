const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serviceRouter = require("./routes/serviceRoutes");
const categoryRouter = require("./routes/categoryRoutes");
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
app.use("/api/services", serviceRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);

module.exports = app;
