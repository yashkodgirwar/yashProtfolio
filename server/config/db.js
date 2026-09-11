const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isMongoConnected = false;
const dataFilePath = path.join(__dirname, '..', 'data', 'portfolioData.json');
const defaultDataPath = path.join(__dirname, '..', 'data', 'defaultData.json');

// Ensure portfolio data file exists if using file storage
const initLocalData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      const defaultData = fs.readFileSync(defaultDataPath, 'utf-8');
      fs.writeFileSync(dataFilePath, defaultData, 'utf-8');
      console.log('⚡ Initialized local portfolio database from default data.');
    }
  } catch (err) {
    console.error('Error initializing local data file:', err);
  }
};

const connectDB = async () => {
  initLocalData();
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`⚠️ MongoDB connection not established (${error.message}).`);
    console.log('⚡ Running in Hybrid/Local Mode: Data will seamlessly persist to data/portfolioData.json');
  }
};

const getIsMongoConnected = () => isMongoConnected;

module.exports = {
  connectDB,
  getIsMongoConnected,
  dataFilePath,
  defaultDataPath
};
