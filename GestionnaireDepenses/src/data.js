let expensesDb = [
    { amount: 50, category: "courses" },
    { amount: 22, category: "sport" },
    { amount: 35, category: "courses" },
    { amount: 10, category: "transport" },
    { amount: 15, category: "entertainment" }
];





import * as R from "ramda";

// Categories to choose from
const categories = ["groceries", "sport", "transport", "leisure"];

// Function to initialize expenses data
const _addExpenses = (length,DataBase) =>
    R.concat(DataBase,
        R.times(
            () => ({
                amount:  Math.floor(Math.random() * 100)+1,// Function to get a random amount between 0 and 100
                category: categories[Math.floor(Math.random() * categories.length)]// Function to get a random category from the categories list

            }),
            length
        )
    )
    ;




//console.log(_addExpenses(30,expensesDb));

export { expensesDb ,_addExpenses, categories};