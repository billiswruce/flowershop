const initStripe = require("../../stripe");
const fs = require("fs").promises;

const createCheckoutSession = async (req, res) => {
  const cart = req.body;

  const stripe = initStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: cart.map((item) => {
      return {
        price: item.product,
        quantity: item.quantity,
      };
    }),

    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173/cancellation",
  });

  res.status(200).json({ url: session.url, sessionId: session.id });
};

//
//
//

const verifySession = async (req, res) => {
  console.log("hallåååå");
  const stripe = initStripe();

  const sessionId = req.body.sessionId;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

      const order = {
        orderNumber: Math.floor(Math.random() * 1000000),
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        products: lineItems.data,
        total: session.amount_total / 100,
        date: new Date(),
      };

      const orders = JSON.parse(await fs.readFile("./data/orders.json"));
      orders.push(order);
      await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));

      res.status(200).json({ verified: true });
    } else {
      res.status(400).json({ error: "Payment not completed." });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying session." });
  }
};

//
//
//

const getProducts = async (req, res) => {
  const stripe = initStripe();
  if (!stripe) {
    console.error("Stripe is not initialized. Check your API key.");
    return res.status(500).send("Stripe initialization failed.");
  }
  try {
    const productPriceData = await stripe.prices.list({
      expand: ["data.product"],
      limit: 100,
    });

    const productsWithPrice = productPriceData.data.map((priceData) => ({
      id: priceData.product.id,
      name: priceData.product.name,
      price: priceData.unit_amount / 100,
      images: priceData.product.images,
    }));

    res.status(200).json(productsWithPrice);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("An error occurred while fetching products.");
  }
};

module.exports = { createCheckoutSession, getProducts, verifySession };
