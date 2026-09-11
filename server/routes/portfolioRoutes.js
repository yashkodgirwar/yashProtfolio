const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Portfolio = require('../models/Portfolio');
const { getIsMongoConnected, dataFilePath, defaultDataPath } = require('../config/db');

// Configure Multer for File Uploads (Images and Resumes/PDFs)
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/pdf';
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDF documents are allowed'));
  }
});

// Helper: Get current data (from MongoDB or Local File)
const getPortfolioData = async () => {
  const defaultData = JSON.parse(fs.readFileSync(defaultDataPath, 'utf-8'));
  const sections = ['skills', 'experience', 'education', 'projects', 'certificates', 'extracurricular'];

  if (getIsMongoConnected()) {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create(defaultData);
      return portfolio.toObject ? portfolio.toObject() : portfolio;
    }

    // Ensure all sections exist in the document
    let needsSave = false;
    for (const sec of sections) {
      if (!portfolio[sec] || !Array.isArray(portfolio[sec])) {
        portfolio[sec] = defaultData[sec] || [];
        portfolio.markModified(sec);
        needsSave = true;
      }
    }
    if (!portfolio.profile || Object.keys(portfolio.profile).length === 0) {
      portfolio.profile = defaultData.profile;
      portfolio.markModified('profile');
      needsSave = true;
    }

    if (needsSave) {
      await portfolio.save();
    }

    return portfolio.toObject ? portfolio.toObject() : portfolio;
  } else {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    for (const sec of sections) {
      if (!parsed[sec]) {
        parsed[sec] = defaultData[sec] || [];
      }
    }
    return parsed;
  }
};

// Helper: Save current data (to MongoDB or Local File)
const savePortfolioData = async (data) => {
  if (getIsMongoConnected()) {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(data);
    } else {
      portfolio.profile = data.profile;
      portfolio.skills = data.skills || [];
      portfolio.experience = data.experience || [];
      portfolio.education = data.education || [];
      portfolio.projects = data.projects || [];
      portfolio.certificates = data.certificates || [];
      portfolio.extracurricular = data.extracurricular || [];
      portfolio.markModified('profile');
      portfolio.markModified('skills');
      portfolio.markModified('experience');
      portfolio.markModified('education');
      portfolio.markModified('projects');
      portfolio.markModified('certificates');
      portfolio.markModified('extracurricular');
    }
    const saved = await portfolio.save();
    return saved.toObject ? saved.toObject() : saved;
  } else {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }
};

// GET full portfolio
router.get('/', async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ success: false, message: 'Server error fetching portfolio data' });
  }
});

// UPLOAD File (Image or Resume PDF)
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ success: false, message: 'File upload failed' });
  }
});

// RESET portfolio to default seed
router.post('/reset', async (req, res) => {
  try {
    const defaultData = JSON.parse(fs.readFileSync(defaultDataPath, 'utf-8'));
    await savePortfolioData(defaultData);
    res.json({ success: true, message: 'Portfolio reset to default state', data: defaultData });
  } catch (error) {
    console.error('Error resetting portfolio:', error);
    res.status(500).json({ success: false, message: 'Failed to reset portfolio' });
  }
});

// UPDATE Hero / Profile info
router.put('/profile', async (req, res) => {
  try {
    const currentData = await getPortfolioData();
    const updatedProfile = { ...currentData.profile, ...req.body };
    currentData.profile = updatedProfile;
    
    await savePortfolioData(currentData);
    res.json({ success: true, message: 'Profile updated successfully', data: currentData.profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
});

// ADD item to a section
router.post('/:section', async (req, res) => {
  const { section } = req.params;
  const validSections = ['projects', 'experience', 'education', 'certificates', 'skills', 'extracurricular'];
  
  if (!validSections.includes(section)) {
    return res.status(400).json({ success: false, message: `Invalid section: ${section}` });
  }

  try {
    const currentData = await getPortfolioData();
    if (!Array.isArray(currentData[section])) {
      currentData[section] = [];
    }

    const newItem = {
      id: req.body.id || `${section.slice(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...req.body
    };

    if (section === 'projects' || section === 'experience' || section === 'extracurricular') {
      currentData[section].unshift(newItem);
    } else {
      currentData[section].push(newItem);
    }

    await savePortfolioData(currentData);
    res.json({ success: true, message: `Item added to ${section}`, data: newItem, allItems: currentData[section] });
  } catch (error) {
    console.error(`Error adding to ${section}:`, error);
    res.status(500).json({ success: false, message: `Failed to add item to ${section}` });
  }
});

// UPDATE item in a section
router.put('/:section/:id', async (req, res) => {
  const { section, id } = req.params;
  const validSections = ['projects', 'experience', 'education', 'certificates', 'skills', 'extracurricular'];
  
  if (!validSections.includes(section)) {
    return res.status(400).json({ success: false, message: `Invalid section: ${section}` });
  }

  try {
    const currentData = await getPortfolioData();
    if (!Array.isArray(currentData[section])) {
      return res.status(404).json({ success: false, message: `Section ${section} not found` });
    }

    const index = currentData[section].findIndex(item => item.id === id || item._id?.toString() === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Item with id ${id} not found in ${section}` });
    }

    currentData[section][index] = {
      ...currentData[section][index],
      ...req.body,
      id: currentData[section][index].id || id
    };

    await savePortfolioData(currentData);
    res.json({ success: true, message: `Item in ${section} updated`, data: currentData[section][index], allItems: currentData[section] });
  } catch (error) {
    console.error(`Error updating item in ${section}:`, error);
    res.status(500).json({ success: false, message: `Failed to update item in ${section}` });
  }
});

// DELETE item from a section
router.delete('/:section/:id', async (req, res) => {
  const { section, id } = req.params;
  const validSections = ['projects', 'experience', 'education', 'certificates', 'skills', 'extracurricular'];
  
  if (!validSections.includes(section)) {
    return res.status(400).json({ success: false, message: `Invalid section: ${section}` });
  }

  try {
    const currentData = await getPortfolioData();
    if (!Array.isArray(currentData[section])) {
      return res.status(404).json({ success: false, message: `Section ${section} not found` });
    }

    const initialLength = currentData[section].length;
    currentData[section] = currentData[section].filter(item => item.id !== id && item._id?.toString() !== id);

    if (currentData[section].length === initialLength) {
      return res.status(404).json({ success: false, message: `Item with id ${id} not found in ${section}` });
    }

    await savePortfolioData(currentData);
    res.json({ success: true, message: `Item removed from ${section}`, allItems: currentData[section] });
  } catch (error) {
    console.error(`Error deleting item from ${section}:`, error);
    res.status(500).json({ success: false, message: `Failed to delete item from ${section}` });
  }
});

module.exports = router;
