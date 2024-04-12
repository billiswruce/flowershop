const fetchUsers = require("../../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const { validationSchemas } = require("../../validation/validationSchemas");
const initStripe = require("../../stripe");

/////////// REGISTER ///////////
const register = async (req, res) => {
  const stripe = initStripe();
  const { error } = validationSchemas.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const DBusers = await fetchUsers();

  const userInDB = DBusers.find((u) => u.email === email);
  if (userInDB) {
    return res.status(400).json("User already exists");
  }

  const stripeCustomers = await stripe.customers.list();
  const customerInStripe = stripeCustomers.data.find(
    (c) => c.email === req.body.email
  );
  if (customerInStripe) {
    return res.status(400).json({ message: "User already in stripe" });
  }

  const saveStripeCustomer = await stripe.customers.create({
    name: req.body.name,
    email: email,
  });

  if (saveStripeCustomer) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      stripeCustomerId: saveStripeCustomer.id,
      email: email,
      name: req.body.name,
      password: hashedPassword,
    };
    DBusers.push(newUser);
    console.log(DBusers);

    await fs.writeFile("./data/users.json", JSON.stringify(DBusers, null, 2));

    res.status(201).json({ message: "User registered", email: newUser.email });
  }
};

/////////// LOGIN ///////////
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await fetchUsers();
    const userExists = users.find((u) => u.email === email);

    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
      return res.status(401).json({ message: "Wrong username or password" });
    }

    req.session.user = { email: userExists.email, id: userExists.id };
    res.status(200).json({ email: userExists.email, id: userExists.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error while logging in" });
  }
};

/////////// LOGOUT ///////////
const logout = (req, res) => {
  try {
    req.session = null;
    res.status(200).json("Logged out");
  } catch (error) {
    console.error("Error logging out:", error);
    res
      .status(400)
      .json({ message: "An error occurred while logging out user" });
  }
};

/////////// AUTHORIZE ///////////
const authorize = (req, res) => {
  try {
    console.log("Session object:", req.session.user);
    if (!req.session || !req.session.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to access this resource" });
    }
  } catch (error) {
    console.error("Error authorizing user:", error);
    return res
      .status(400)
      .json({ message: "An error occurred while authorizing user" });
  }
};

module.exports = { register, login, logout, authorize };
