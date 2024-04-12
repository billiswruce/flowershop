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
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })
);
app.use("/payments", stripeRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.get("/products", getProducts);

app.listen(3000, () => console.log("Server is blooming🌷".rainbow.bold));
