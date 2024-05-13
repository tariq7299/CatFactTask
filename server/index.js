const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const PORT = 3000;


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
  const userData = {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  res.json({ token, userData });
});


app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});


function generateToken(userId) {
  const hash = crypto.createHmac('sha256', secretKey)
    .update(userId.toString())
    .digest('hex');
  return hash;
}


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
  console.log(`Cat server is runnng on ${PORT}`);
});