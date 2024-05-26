const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Définir les routes pour les dépenses
router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;

