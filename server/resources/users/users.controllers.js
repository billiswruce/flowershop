const fetchUsers = require("../../utils/fetchUsers");

const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = { getUsers };
