document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addExpensesLink').addEventListener('click', addExpenses);
    document.getElementById('expensesResumeLink').addEventListener('click', getExpensesResume);
    document.getElementById('getTotalExpensesLink').addEventListener('click', getTotalExpenses);

    document.getElementById('addExpenseForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const response = await fetch('http://localhost:2000/addSingleExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, category })
        });
        const data = await response.json();
        console.log(data);
    });

    document.getElementById('resetExpensesButton').addEventListener('click', async () => {
        const response = await fetch('http://localhost:2000/resetExpenses');
        const data = await response.json();
        console.log(data);
    });
});

function addExpenses() {
    fetch('http://localhost:2000/addExpenses')
        .then(response => response.json())
        .then(data => displayResult(data.expenses))
        .catch(error => console.error('Error:', error));
}

function getExpensesResume() {
    fetch('http://localhost:2000/expensesResume')
        .then(response => response.json())
        .then(data => displayResult(data.expenses))
        .catch(error => console.error('Error:', error));
}

function getTotalExpenses() {
    fetch('http://localhost:2000/get-total-expenses')
        .then(response => response.json())
        .then(data => displayTotalExpenses(data.totalExpenses))
        .catch(error => console.error('Error:', error));
}

function displayResult(expenses) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h2>Expenses</h2>';
    const list = document.createElement('ul');
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `Expense #${expense.expenseNumber || ''}: ${expense.amount}€ - ${expense.category}`;
        list.appendChild(listItem);
    });
    contentDiv.appendChild(list);
}

function displayTotalExpenses(totalExpenses) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h2>Total Expenses</h2>';
    const list = document.createElement('ul');
    for (const [category, total] of Object.entries(totalExpenses)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: ${total}€`;
        list.appendChild(listItem);
    }
    contentDiv.appendChild(list);
}
