const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi Registrasi
exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Cek apakah email sudah ada
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'STUDENT',
        // Jika Industri, buatkan profil otomatis
        industryProfile: role === 'INDUSTRY' ? { create: { name: name } } : undefined
      },
    });

    res.status(201).json({ 
      message: "Registrasi berhasil!", 
      user: { id: newUser.id, name: newUser.name } 
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal registrasi", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Buat Token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret_pbl_123',
      { expiresIn: '1d' }
    );

    // Kirim response ke frontend
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};