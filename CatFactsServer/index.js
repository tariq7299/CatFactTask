const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const PORT = 3000;

// My mini database
const tokenStorage = {};
const users = [
  { id: 1, username: 'hassan', password: '1122' },
  { id: 2, username: 'tariq', password: '1122' },
];

const usersCatFacts = [
  {factId: 1, owner: 'Tariq', catFact: 'This a fake cat fact !'},
  {factId: 2, owner: 'Hassan', catFact: 'Another fake cat fact!!'},
  {factId: 3, owner: 'Karim', catFact: 'Cats like to swim 🌊'},
  {factId: 4, owner: 'Ahmed', catFact: 'Did you know that cats love playing with dolphines 🐬'},
  {factId: 5, owner: 'Sara', catFact: 'Girls dont like cats 🗿'},
  {factId: 6, owner: 'Hassan', catFact: 'I am tired of comping up with those stupid facts'},
  {factId: 7, owner: 'Tariq', catFact: 'please like my website 🐸'},
]

const secretKey = 'CAT-FACTS-VERY-SECRET';
app.use(express.json());
app.use(cors());

app.get('/api/isAuthenticated', authenticateToken, (req, res) => {
  console.log("HEYEYEYE");
  res.json({ isAuthenticated: true });
});

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

app.get("/api/facts", (req, res) => {
  
  try {

    res.status(200).json(usersCatFacts);

  } catch(error) {
    res.status(500).json({message: error.message})
  }
});

app.post('/api/facts/create', authenticateToken, (req, res) => {

try{
  const username  = req.username;
  const {newCatFact} = req.body;


  const catFactsIds = usersCatFacts.map((fact) => fact.factId);
      
  const highestId = catFactsIds.length > 0 ? Math.max(...catFactsIds) : 0;
  const newId = highestId + 1;


  const newFact = {factId: newId, owner: username, catFact: newCatFact}

  usersCatFacts.push(newFact)

  res.status(200).json({ message: 'New fact created successfully'});
} catch (error) {
  res.status(500).json({ message: error.message });
}

});

function authenticateToken(req, res, next) {

  console.log("HEYEYEYE")

  const token = req.headers.authorization?.split(' ')[1];
  

  if (!token || !tokenStorage[token]) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const userId = tokenStorage[token];
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.userId = user.id
  req.username = user.username
  next();
}

function generateToken(userId) {
  const hash = crypto.createHmac('sha256', secretKey)
    .update(userId.toString())
    .digest('hex');
  return hash;
}

app.listen(PORT, () => {
  console.log(`Cat server is runnng on ${PORT}`);
});