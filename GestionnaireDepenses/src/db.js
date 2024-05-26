import * as R from "ramda";
import { expensesDb } from "./data.js";

// Fonction pour ajouter une dépense à la base de données
const addExpense = (amount, category) =>
    R.append({ amount, category }, expensesDb);

// Fonction pour obtenir toutes les dépenses d'une catégorie spécifique
const getExpensesByCategory = (category) => {
    const filteredExpenses = R.filter(R.propSatisfies(cat => cat.toLowerCase() === category.toLowerCase(), "category"), expensesDb);
    console.log("Base de données après le filtrage :", filteredExpenses);
    return filteredExpenses;
};

// Fonction pour obtenir le total des dépenses d'une catégorie spécifique
const getTotalExpensesByCategory = (category) =>
    R.pipe(
        getExpensesByCategory,
        R.pluck("amount"),
        R.sum
    )(category);

const expensesResume = () => {
    console.log("Summary of Expenses:");
    R.addIndex(R.forEach)((expense, index) => {
        console.log(`Expense ${index + 1}:`);
        console.log(`Amount: ${expense.amount}`);
        console.log(`Category: ${expense.category}`);
        console.log("-----------------------------");
    }, expensesDb);
};


const loadConfig = async () => {
    try {
        // Supposons que vous ayez un modèle mongoose appelé Config pour stocker la configuration
        const cfg = await Config.findOne({});
        if (cfg) {
            _configToEnv(cfg); // Fonction pour mettre à jour la configuration de l'environnement
        }
    } catch (error) {
        console.error("Error loading config:", error);
    }
};



export {
    loadConfig,
    addExpense,
    getExpensesByCategory,
    getTotalExpensesByCategory,
    expensesResume
};
