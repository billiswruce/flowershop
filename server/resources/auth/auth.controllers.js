const fetchUsers = require("../../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const { validationSchemas } = require("../../validation/validationSchemas");

const register = async (req, res) => {
  const { error } = validationSchemas.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const users = await fetchUsers();
  const userAlreadyExists = users.find((u) => u.email === email);

  if (userAlreadyExists) {
    return res.status(400).json({ message: "Användaren finns redan" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

  res
    .status(201)
    .json({ message: "Användare registrerad", email: newUser.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await fetchUsers();
  const userExists = users.find((u) => u.email === email);

  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
  }

  req.session.user = userExists;
  res.status(200).json(userExists.email);
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json("Utloggad");
};

const authorize = (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this resource" });
  }
  res.status(200).json(req.session.user.email);
};

module.exports = { register, login, logout, authorize };
