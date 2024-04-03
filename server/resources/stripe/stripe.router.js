const express = require("express");
const { createCheckoutSession } = require("./stripe.controller");
const router = express.Router();
const { getProducts } = require("./stripe.controller");

router.post("/create-checkout-session", createCheckoutSession);
router.get("/", getProducts);

module.exports = router;
