import * as R from 'ramda';
import { expensesDb, categories, saveExpenses } from './data.js';

const getTotalExpensesByCategory = R.pipe(
    R.groupBy(R.prop('category')),
    R.map(R.pipe(R.pluck('amount'), R.sum)),
    categories => R.assoc('Total', R.sum(R.values(categories)), categories)
);

const expensesResume = (Database) => {
    const Database2 = R.addIndex(R.map)((expense, index) => ({
        expenseNumber: index + 1,
        amount: expense.amount,
        category: expense.category
    }), Database);

    return R.sortBy(R.prop('category'), Database2);
};

const addSingleExpense = (amount, category) => {
    const newExpense = { amount, category };
    expensesDb.push(newExpense);
    saveExpenses();
    return newExpense;
};

const resetExpenses = () => {
    expensesDb.length = 0;
    saveExpenses();
};

const loadConfig = async () => {
    try {
        const cfg = await Config.findOne({});
        if (cfg) {
            _configToEnv(cfg);
        }
    } catch (error) {
        console.error("Error loading config:", error);
    }
};

export {
    loadConfig,
    getTotalExpensesByCategory,
    expensesResume,
    addSingleExpense,
    resetExpenses
};
