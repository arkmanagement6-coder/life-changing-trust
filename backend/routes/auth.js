const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'LIFE_SECRET_KEY_2026';

// Mock DB registries matching current AppContext database
const mockUsers = [];

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone, password, role, city, state } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields (name, email, password)" });
    }

    const emailLower = email.toLowerCase();
    const exists = mockUsers.some(u => u.email.toLowerCase() === emailLower);
    if (exists) {
      return res.status(409).json({ error: "User already registered with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = {
      id: "usr-" + Math.floor(1000 + Math.random()*9000),
      name,
      email: emailLower,
      phone,
      password_hash,
      role: role || 'donor',
      city,
      state,
      country: 'India',
      created_at: new Date()
    };

    mockUsers.push(newUser);

    // Create JWT
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Default Sandbox Credentials check
    const emailLower = email.toLowerCase();
    let user = mockUsers.find(u => u.email === emailLower);

    // Seed default admin sandbox if empty
    if (emailLower === 'admin@projectlife.org' && password === 'password') {
      user = { id: "admin-sbox", name: "Chairperson Shalini", email: "admin@projectlife.org", role: "admin" };
    } else if (emailLower === 'donor@projectlife.org' && password === 'password') {
      user = { id: "donor-sbox", name: "Ramesh Kumar", email: "donor@projectlife.org", role: "donor" };
    } else if (emailLower === 'volunteer@projectlife.org' && password === 'password') {
      user = { id: "vol-sbox", name: "Kunal Gupta", email: "volunteer@projectlife.org", role: "volunteer" };
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid email credentials or password" });
    }

    // If hashed password exists (was registered via endpoint)
    if (user.password_hash) {
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email credentials or password" });
      }
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Log In successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and verification OTP code are required" });
  }

  if (otp === '1234') {
    return res.status(200).json({ success: true, message: "OTP validation check passed" });
  }
  
  res.status(400).json({ success: false, error: "Invalid verification code" });
});

module.exports = router;
