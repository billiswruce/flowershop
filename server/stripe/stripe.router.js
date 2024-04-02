const express = require("express");
const { createCheckoutSession } = require("./stripe.controller");
const router = express.Router();

const stripeRouter = require("./stripe/stripe.router");
const app = express();

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
