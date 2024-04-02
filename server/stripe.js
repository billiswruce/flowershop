const Stripe = require("stripe"); //klass alltid stor bokstav

const initStripe = () => {
  const apiKey = process.env.STRIPE_KEY;
  if (!apiKey) return null;
  return new Stripe(apiKey, {
    apiVersion: "2023-10-16",
  });
};

module.exports = initStripe;
