import * as R from 'ramda';
import { expensesDb, categories, saveExpenses } from './data.js';

// Fonction pour ajouter une dépense à la base de données
const addExpense = (amount, category) => {
    const newExpense = { amount, category };
    expensesDb.push(newExpense);
    saveExpenses();
    return newExpense;
};

// Function to get total expenses by category and overall total
const getTotalExpensesByCategory = R.pipe(
    // Step 1: Group by category
    R.groupBy(R.prop('category')),
    // Step 2: Map over each category group to sum the amounts
    R.map(R.pipe(
        R.pluck('amount'), // Extract amounts
        R.sum // Sum the amounts
    )),
    // Step 3: Compute the total sum and include it in the result
    categories => R.assoc('Total', R.sum(R.values(categories)), categories)
);

const expensesResume = (Database) => {
    const Database2 = R.addIndex(R.map)((expense, index) => {
        return {
            expenseNumber: index + 1,
            amount: expense.amount,
            category: expense.category
        };
    }, Database);

    return R.sortBy(R.prop('category'), Database2);
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
    getTotalExpensesByCategory,
    expensesResume
};
