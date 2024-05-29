import fs from 'fs';
import * as R from 'ramda';

let expensesDb = [
    { amount: 50, category: "groceries" },
    { amount: 22, category: "sport" },
    { amount: 35, category: "groceries" },
    { amount: 10, category: "transport" },
    { amount: 15, category: "leisure" }
];

const categories = ["groceries", "sport", "transport", "leisure"];
const DATA_FILE = './data/expenses.json';

const loadExpenses = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        expensesDb = JSON.parse(data);
    }
};

const saveExpenses = () => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(expensesDb, null, 2));
};

const _addExpenses = (length) => {
    const newExpenses = R.times(
        () => ({
            amount: Math.floor(Math.random() * 100) + 1,
            category: categories[Math.floor(Math.random() * categories.length)]
        }),
        length
    );
    expensesDb = R.concat(expensesDb, newExpenses);
    saveExpenses();
    return newExpenses;
};

// src/data.js
export function addSingleExpense(amount, category) {
    const newExpense = { id: Date.now(), amount, category };
    // Assuming expensesDb is an array where you store expenses
    expensesDb.push(newExpense);
    return newExpense;
}


export { expensesDb, _addExpenses, categories, loadExpenses, saveExpenses};
