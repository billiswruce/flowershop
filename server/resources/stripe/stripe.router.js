const express = require("express");
const { createCheckoutSession, verifySession } = require("./stripe.controller");
const router = express.Router();
const { getProducts } = require("./stripe.controller");

router.post("/create-checkout-session", createCheckoutSession);
router.post("/verify-session", verifySession);
router.get("/", getProducts);

module.exports = router;
