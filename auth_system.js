// Import necessary libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Mock user data (In production, use a database)
const users = [];

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Add this if you're handling requests from different domains

// Helper function to authenticate JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}

// Routes

// Home Route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Auth System</h1><p><a href="/login">Login</a> | <a href="/protected">Protected Page</a></p>');
});

// User Registration Route (Signup)
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };

  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
  res.json({ message: 'Logged in successfully' });
});

// Logout Route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`<h1>Protected Page</h1><p>Welcome, ${req.user.username}!</p><form method="POST" action="/logout"><button type="submit">Logout</button></form>`);
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
