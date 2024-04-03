const fetchUsers = require("../../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  //hämta email och lösenord från req.body
  const { email, password } = req.body;
  //så att anvädaren inte redan finns
  const users = await fetchUsers();
  const userAlreadyExists = users.find((u) => u.email === email);

  if (userAlreadyExists) {
    return res.status(400).json({ message: "Användaren finns redan" });
  }
  //kryptera lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);

  //sparar till databasen
  const newUser = {
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
  //skicka tillbaka ett svar

  res.status(201).json(newUser.email);
};

const login = async (req, res) => {
  //kolla så användaren finns
  const { email, password } = req.body;
  const users = await fetchUsers();
  const userExists = users.find((u) => u.email === email);

  //koll så lösenord stämmer
  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
  }
  //skapa en session
  req.session.user = userExists;
  //skicka tillbaka ett svar
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
