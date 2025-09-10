const express = require("express");
const app = express();
const cors = require("cors");
//Middleware
app.use(express.json());
// app.use(cors());
// Allow requests from your Netlify frontend
app.use(cors({
  origin: "https://todo-frontend-mcjo.netlify.app",  // your Netlify domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

require("dotenv").config();
const port = process.env.PORT || 8080;
const dbConnection = require("./config/dbConnection");
//API HEATH CHECKUP
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

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
