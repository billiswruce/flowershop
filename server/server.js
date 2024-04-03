const express = require("express");
const cors = require("cors");
require("dotenv").config();
const colors = require("colors");
const cookieSession = require("cookie-session");

const stripeRouter = require("./resources/stripe/stripe.router");
const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");
const { getProducts } = require("./resources/stripe/stripe.controller");

const app = express();

// Set up CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  cookieSession({
    secret: "hemligt",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 vecka
    //finns massa mer saker, kolla föreläsningen från 40 minuter 3 filmen för mer info
  })
);
app.use("/payments", stripeRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.get("/products", getProducts);

app.listen(3000, () => console.log("Server is blooming🌷".rainbow.bold));
