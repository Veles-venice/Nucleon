const { getDB } = require("../config/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, password } = req.body;

    if (!email || !password || !user_name) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const db = getDB();
    const users = db.collection("signup");

    const existingUser = await users.findOne({
      $or: [{ email }, { user_name }]
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Username or Email already exists"
      });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await users.insertOne({
      _id: userId,
      first_name: first_name || null,
      last_name: last_name || null,
      user_name,
      email,
      password_hash,
      created_at_acc: new Date()
    });

    res.status(201).json({ message: "registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required field(s) missing" });
    }

    const db = getDB();
    const users = db.collection("signup");
    const logins = db.collection("login");

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    await logins.insertOne({
      user_id: user._id,
      login_time: new Date()
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        user_name: user.user_name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
