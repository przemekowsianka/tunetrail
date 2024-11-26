const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const user = new User({ login, email, password });
    await user.save();
    res.status(201).json({ message: "Zarejestrowano pomyślnie" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const user = await User.findOne({ email, login });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Nieprawidłowe dane" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
