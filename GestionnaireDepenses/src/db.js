import * as R from "ramda";
import { expensesDb,categories } from "./data.js";

// Fonction pour ajouter une dépense à la base de données
const addExpense = (amount, category) =>
    R.append({ amount, category }, expensesDb);


// Fonction pour obtenir le total des dépenses d'une catégorie spécifique
const getTotalExpensesByCategory = (Database) =>
    R.pipe(
        R.filter(expense => R.includes(expense.category, categories)),
        R.pluck('amount'),
        R.sum
    )(Database);


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
