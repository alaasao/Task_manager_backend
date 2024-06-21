const connectDb = require("./db/connect");
const express = require("express");
const app = express();
require("dotenv/config");
const notFound = require("./middelware/not-found");
const errorHandler=require("./middelware/errorHandler")
const port = process.env.PORT|| 3000;
app.use(express.json());
const tasks = require("./routes/tasks");



app.use("/tasks", tasks);
app.use(notFound);
app.use(errorHandler)
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (err) {
    console.log("Failed to connect to the database:", err);
  }
};

start();
