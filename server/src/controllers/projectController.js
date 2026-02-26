const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProjects = async (req, res) => {
  try {
    const industry = await prisma.industryProfile.findUnique({
      where: { userId: req.user.id }
    });

    if (!industry) return res.status(404).json({ message: "Profil tidak ditemukan" });

    const projects = await prisma.project.findMany({
      where: { industryProfileId: industry.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, category, problemStatement, taskDetail, expectedOutput } = req.body;

    const industry = await prisma.industryProfile.findUnique({
      where: { userId: req.user.id }
    });

    if (!industry) {
      return res.status(404).json({ message: "Profil Industri tidak ditemukan." });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        category,
        problemStatement,
        taskDetail,
        expectedOutput,
        industryProfileId: industry.id,
        status: 'OPEN'
      }
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat proyek", error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { industry: true }
    });
    if (!project) return res.status(404).json({ message: "Proyek tidak ditemukan" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProjectsForGuru = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { status: 'OPEN' },
      include: {
        industry: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil database proyek", error: error.message });
  }
};