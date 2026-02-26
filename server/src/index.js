const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json({ limit: '20mb' })); 
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use(cors());

const authController = require('./controllers/authController');
const industryController = require('./controllers/industryController');
const projectRoutes = require('./routes/projectRoutes');
const verifyToken = require('./middlewares/verifyToken');

console.log("✅ AuthController Loaded:", Object.keys(authController));

app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

app.use('/api/projects', projectRoutes);
app.get('/api/industry/profile', verifyToken, industryController.getProfile);
app.put('/api/industry/profile', verifyToken, industryController.updateProfile);

app.get('/api/test-auth', verifyToken, (req, res) => {
  res.json({ message: "Kamu berhasil akses fitur rahasia!", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server LOCALINK berjalan di port ${PORT}`);
});