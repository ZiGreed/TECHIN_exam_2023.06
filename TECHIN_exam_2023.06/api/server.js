const app = require("./app");
const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://Synicin:5BAbyrO0yLt27LZg@cluster0.e3peplw.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connection successful!");
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server started on port ${port} and listening for requests`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1); // Exit the process if the database connection fails
  });
