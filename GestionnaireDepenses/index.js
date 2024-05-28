import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import logger from "koa-logger";
import {getTotalExpensesByCategory, loadConfig} from "./src/db.js";
import { expensesResume} from "./src/db.js";
import { expensesDb } from "./src/data.js";
import { _addExpenses } from "./src/data.js";
import { categories } from "./src/data.js";

const app = new Koa();
const router = new Router();

app.use(logger());
app.use(cors());

// Define routes
router.get("/", (ctx) => {
    ctx.type = "html";
    ctx.body = [
        "$ We spent some MONEY : $",
        "",
        '- <a href="http://localhost:2000/addExpenses">/Generate Expenses</a>',
        '- <a href="http://localhost:2000/expensesResume">/Expenses Resume</a>',
        '- <a href="http://localhost:2000/get-total-expenses">/Get Total Expenses</a>',

    ].join("<br>");
});

// Define route handlers
router.get("/expensesResume", (ctx) => {
    // Assuming expensesDb is defined or imported from elsewhere
    const vali = expensesResume(expensesDb);
    ctx.body = {
        status: "success",
        expenses: vali
    };
});

router.get("/get-total-expenses", (ctx) => {
    // Assuming expensesDb is defined or imported from elsewhere
    const irenu = getTotalExpensesByCategory(expensesDb, "courses");
    ctx.body = {
        status: "success",
        totalExpenses: irenu
    };
});

// Define route handlers
router.get("/addExpenses", (ctx) => {
    // Assuming expensesDb is defined or imported from elsewhere
    const gab = _addExpenses(20,expensesDb);
    ctx.body = {
        status: "success",
        expenses: gab
    };
});

// Use routes and HTTP methods
app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(2000);
console.log("Server started on: http://localhost:2000");
