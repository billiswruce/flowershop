const initStripe = require("../stripe");

const createCheckoutSession = async (req, res) => {
  const stripe = initStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      //vår backend, stripe kommer behöva objekt som ser ut såhär - tänk på det när bygger client så den får bra info från början
      {
        price: "price_1P17pv05kEsouJvUgx9bSwaT",
        quantity: 1,
      },
    ],
    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.status(200).json({ url: session.url });
};

module.exports = { createCheckoutSession };
