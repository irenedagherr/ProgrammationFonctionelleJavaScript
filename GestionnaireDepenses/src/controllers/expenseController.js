// Dans expenseController.js

const Expense = require('../models/expenseModel');

const expenseController = {
    getAllExpenses: (req, res) => {
        // Logique pour récupérer toutes les dépenses depuis le service
        res.send('Liste des dépenses');
    },
    createExpense: (req, res) => {
        // Logique pour créer une nouvelle dépense
    },
    getExpenseById: (req, res) => {
        // Logique pour récupérer une dépense par ID
    },
    updateExpense: (req, res) => {
        // Logique pour mettre à jour une dépense
    },
    deleteExpense: (req, res) => {
        // Logique pour supprimer une dépense
    }
};

module.exports = expenseController;
