const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateProfile = async (req, res) => {
  try {
    const { namaPerusahaan, alamat, deskripsi, website, logo, bidangKerja, contactPerson } = req.body;
    
    const updated = await prisma.industryProfile.update({
      where: { userId: req.user.id },
      data: { 
        namaPerusahaan,
        alamat, 
        deskripsi, 
        website, 
        logo,
        bidangKerja,
        contactPerson
      }
    });

    res.json({ message: "Profil diperbarui", data: updated });
  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ message: error.message });
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