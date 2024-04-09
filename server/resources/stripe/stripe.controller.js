const initStripe = require("../../stripe");
const fs = require("fs").promises;
require("dotenv").config();

///////// CHECKOUT ///////////
const createCheckoutSession = async (req, res) => {
  const cart = req.body;

  const stripe = initStripe();

  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(cart);

  const line_items = await Promise.all(
    cart.map(async (item) => {
      const product = await stripe.products.retrieve(item.product);
      const price = await stripe.prices.list({
        product: item.product,
        limit: 1,
      });
      return {
        price_data: {
          currency: "sek",
          product_data: {
            name: product.name,
            images: [product.images[0]],
          },
          unit_amount: price.data[0].unit_amount,
        },
        quantity: item.quantity,
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: req.session.user.id,
    customer_email: req.session.user.email,
    line_items: line_items,
    allow_promotion_codes: true,
    mode: "payment",
    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173/cancellation",
  });

  res.json({ sessionId: session.id, url: session.url });
};

///////// VERIFY ///////////
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

///////// GET PRODUCTS ///////////
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
