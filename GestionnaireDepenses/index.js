import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import logger from "koa-logger";
import { loadConfig } from "./src/db.js";
import { expensesResume} from "./src/db.js";
import { expensesDb } from "./src/data.js";


const app = new Koa();
const router = new Router();

app.use(logger());
app.use(cors());

// Define routes
router.get("/", (ctx) => {
    ctx.type = "html";
    ctx.body = [
        "Usable routes :",
        "",
        'GET <a href="http://localhost:2000/expensesResume">/expensesResume</a>',
        'GET <a href="http://localhost:2000/get-total-expenses">/get-total-expenses</a>',
    ].join("<br>");
});

// Define route handlers
router.get("/expensesResume", (ctx) => {
    // Assuming expensesDb is defined or imported from elsewhere
    const expensesResumes = expensesResume(expensesDb);
    ctx.body = {
        status: "success",
        expenses: expensesResumes
    };
});

router.get("/get-total-expenses", (ctx) => {
    // Assuming expensesDb is defined or imported from elsewhere
    const totalCoursesExpenses = getTotalExpensesByCategory(expensesDb, "courses");
    ctx.body = {
        status: "success",
        totalExpenses: totalCoursesExpenses
    };
});

// Use routes and HTTP methods
app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(2000);
console.log("Server started on: http://localhost:2000");
