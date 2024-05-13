const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;


const users = [
  { id: 1, username: 'Hassan', password: '1122' },
  { id: 2, username: 'Tariq', password: '1122' },
];

const secretKey = 'your-secret-key';

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});

// Token generation function
function generateToken(userId) {
  const hash = crypto.createHmac('sha256', secretKey)
    .update(userId.toString())
    .digest('hex');
  return hash;
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const userId = users.findIndex(user => generateToken(user.id) === token);

  if (userId === -1) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.userId = users[userId].id;
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});