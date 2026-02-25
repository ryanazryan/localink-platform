const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateProfile = async (req, res) => {
  const { namaPerusahaan, deskripsi, alamat, website } = req.body;
  const userId = req.user.id;

  try {
    const updatedProfile = await prisma.industryProfile.update({
      where: { userId: userId },
      data: { namaPerusahaan, deskripsi, alamat, website },
    });

    res.json({ message: "Profil berhasil diperbarui!", data: updatedProfile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await prisma.industryProfile.findUnique({
      where: { userId: req.user.id },
      include: { user: { select: { email: true } } }
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};