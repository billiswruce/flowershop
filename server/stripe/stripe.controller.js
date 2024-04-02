const initStripe = require("../stripe");

const createCheckoutSession = async (req, res) => {
  const cart = req.body;

  const stripe = initStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment", //vår backend, stripe kommer behöva objekt som ser ut såhär - tänk på det när bygger client så den får bra info från början
    line_items: cart.map((item) => {
      return {
        price: item.product,
        quantity: item.quantity,
      };
    }),

    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173/cancellation",
  });

  res.status(200).json({ url: session.url });
};

module.exports = { createCheckoutSession };
