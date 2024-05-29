import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import { getTotalExpensesByCategory, loadConfig, expensesResume, resetExpenses } from "./src/db.js";
import { expensesDb, _addExpenses, loadExpenses } from "./src/data.js";
import { addSingleExpense } from "./src/data.js";

const app = new Koa();
const router = new Router();

app.use(logger());
app.use(cors());
app.use(bodyParser());

loadExpenses();

// Define routes
router.get("/", (ctx) => {
    ctx.type = "html";
    ctx.body = [
        "$ We spent some MONEY : $",
        "",
        '- <a href="/addExpenses">Generate Expenses</a>',
        '- <a href="/expensesResume">Expenses Categorization</a>',
        '- <a href="/get-total-expenses">Get Total Expenses</a>',
    ].join("<br>");
});

router.get("/expensesResume", (ctx) => {
    const summary = expensesResume(expensesDb);
    ctx.body = {
        status: "success",
        expenses: summary
    };
});

router.get("/get-total-expenses", (ctx) => {
    const totalExpenses = getTotalExpensesByCategory(expensesDb);
    ctx.body = {
        status: "success",
        totalExpenses: totalExpenses
    };
});

router.get("/addExpenses", (ctx) => {
    const newExpenses = _addExpenses(20);
    ctx.body = {
        status: "success",
        expenses: newExpenses
    };
});

router.post("/addSingleExpense", (ctx) => {
    console.log("Request Body:", ctx.request.body); // Log the request body for debugging
    const { amount, category } = ctx.request.body;
    if (!amount || !category) {
        ctx.status = 400;
        ctx.body = { status: "error", message: "Amount and category are required." };
        return;
    }
    const newExpense = addSingleExpense(amount, category);
    ctx.body = { status: "success", expense: newExpense };
});

router.get("/resetExpenses", (ctx) => {
    resetExpenses();
    ctx.body = { status: "success", message: "Expenses reset successfully." };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(2000, () => {
    console.log("Server started on: http://localhost:2000");
});
