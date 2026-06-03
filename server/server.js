const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/expenses", expenseRoutes);

mongoose.connect("mongodb://localhost:27017/expense-tracker")
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(5000, () => console.log("Server running on https://expense-tracker-server-01d4.onrender.com"));
  })
  .catch(err => console.log(err));
