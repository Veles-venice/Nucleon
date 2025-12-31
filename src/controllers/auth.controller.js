const db = require("../config/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, password } = req.body;

    if (!email || !password || !user_name) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const sql = `
      INSERT INTO signup 
      (id, first_name, last_name, user_name, email, password_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
      userId,
      first_name || null,
      last_name || null,
      user_name,
      email,
      password_hash
    ]);

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Username or Email already exists"
      });
    }

    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute(
      "SELECT * FROM signup WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await db.execute(
      "INSERT INTO login (user_id) VALUES (?)",
      [user.id]
    );

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
