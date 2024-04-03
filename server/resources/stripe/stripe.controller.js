const initStripe = require("../../stripe");

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

const getProducts = async (req, res) => {
  const stripe = initStripe();
  if (!stripe) {
    console.error("Stripe is not initialized. Check your API key.");
    return res.status(500).send("Stripe initialization failed.");
  }

  try {
    const productPriceData = await stripe.prices.list({
      expand: ["data.product"],
    });

    const productsWithPrice = productPriceData.data.map((priceData) => ({
      id: priceData.product.id,
      name: priceData.product.name,
      price: priceData.unit_amount / 100, // Convert from cents to currency unit
      images: priceData.product.images, // Assuming images are included in the product data
    }));

    res.status(200).json(productsWithPrice);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("An error occurred while fetching products.");
  }
};

module.exports = { createCheckoutSession, getProducts };
