const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user_model');
const { where } = require('sequelize');

const SECRET_KEY = 'mySuperSecretKey'; // thay bằng biến môi trường trong production

// Đăng ký
exports.register = async (req, res) => {
  // console.log(req)
  const { username, password, email, phone } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await User.create({ username, password, email,phone }); // Lưu plain text

    res.status(201).json({ message: 'User registered', user: newUser.username, email: newUser.email, phone:newUser.phone });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid username' });

    const valid = await User.findOne({where: {password}});
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user.id, username: user.username }, 'myTestSecret', { expiresIn: '1h' });
    

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

// Đăng xuất (client nên xoá token phía frontend)
exports.logout = (req, res) => {
  // Trong ứng dụng sử dụng JWT, logout thường được xử lý phía client bằng cách xoá token.
  res.json({ message: 'Logged out (client should delete token)' });
};
