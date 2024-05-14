const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const PORT = 3000;

const tokenStorage = {};

const users = [
  { id: 1, username: 'hassan', password: '1122' },
  { id: 2, username: 'tariq', password: '1122' },
];

const secretKey = 'CAT-FACTS-VERY-SECRET';

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.post('/api/login', (req, res) => {

  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);

  tokenStorage[token] = user.id;

  const userData = {
    id: user.id,
    username: user.username,
  };

  res.json({ token, userData });
});


function generateToken(userId) {
  const hash = crypto.createHmac('sha256', secretKey)
    .update(userId.toString())
    .digest('hex');
  return hash;
}

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});


function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || !tokenStorage[token]) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const userId = tokenStorage[token];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }


  req.userId = users[userId].id;
  next();
}

app.listen(PORT, () => {
  console.log(`Cat server is runnng on ${PORT}`);
});