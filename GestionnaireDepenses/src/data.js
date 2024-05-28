import fs from 'fs';
import * as R from 'ramda';

let expensesDb = [
    { amount: 50, category: "groceries" },
    { amount: 22, category: "sport" },
    { amount: 35, category: "groceries" },
    { amount: 10, category: "transport" },
    { amount: 15, category: "leisure" }
];

// Categories to choose from
const categories = ["groceries", "sport", "transport", "leisure"];

// Path to the JSON file
const DATA_FILE = './data/expenses.json';

// Function to load data from a JSON file
const loadExpenses = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        expensesDb = JSON.parse(data);
    }
};

// Function to save data to a JSON file
const saveExpenses = () => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(expensesDb, null, 2));
};

// Function to initialize expenses data
const _addExpenses = (length) => {
    const newExpenses = R.times(
        () => ({
            amount: Math.floor(Math.random() * 100) + 1, // Random amount between 1 and 100
            category: categories[Math.floor(Math.random() * categories.length)] // Random category
        }),
        length
    );
    expensesDb = R.concat(expensesDb, newExpenses);
    saveExpenses();
    return newExpenses;
};

export { expensesDb, _addExpenses, categories, loadExpenses, saveExpenses };
