const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/expenseController");

router.get("/summary", ctrl.getSummary);
router.get("/", ctrl.getExpenses);
router.post("/", ctrl.addExpense);
router.put("/:id", ctrl.updateExpense);
router.delete("/:id", ctrl.deleteExpense);

module.exports = router;
