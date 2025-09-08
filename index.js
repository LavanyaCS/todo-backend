const express = require("express");
const app = express();
const cors = require("cors");
//Middleware
app.use(express.json());
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 8080;
const dbConnection = require("./config/dbConnection");
//Routes
const authRoute = require("./routes/authRoute");
app.use("/api/auth",authRoute);
const taskRoute = require("./routes/taskRoute");
app.use("/api/tasks",taskRoute);
//App Listen
dbConnection();
app.listen(port, () => {
console.log(`Server is connected on ${port}`);
})
