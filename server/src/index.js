const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authController = require('./controllers/authController');
const industryController = require('./controllers/industryController');
const verifyToken = require('./middlewares/authMiddleware');


app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

app.get('/api/industry/profile', verifyToken, industryController.getProfile);
app.put('/api/industry/profile', verifyToken, industryController.updateProfile);

app.get('/api/test-auth', verifyToken, (req, res) => {
  res.json({ message: "Kamu berhasil akses fitur rahasia!", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server LOCALINK berjalan di port ${PORT}`);
});