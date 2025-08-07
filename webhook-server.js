const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create a custom console logger that writes to both console and file
const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Write to console
  console.log(message);
  
  // Write to log file
  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, `webhook-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, logMessage);
};

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Webhook endpoint
app.post('/webhook', (req, res) => {
  try {
    logToFile('📡 Webhook received at: ' + new Date().toISOString());
    logToFile('📊 Data summary:');
    logToFile(`  - Generated: ${req.body.generatedAt}`);
    logToFile(`  - Form Version: ${req.body.formVersion}`);
    logToFile(`  - Completed Pages: ${req.body.completedPages}/${req.body.totalPages}`);
    
    // Log specific configuration sections
    const config = req.body.configuration;
    if (config.developerInfo?.fullName) {
      logToFile(`  - Developer: ${config.developerInfo.fullName}`);
    }
    if (config.appConfiguration?.appName) {
      logToFile(`  - App Name: ${config.appConfiguration.appName}`);
    }
    
    // Log all sections present in the configuration
    logToFile('\n📋 Configuration Sections Present:');
    Object.keys(config).forEach(section => {
      const sectionData = config[section];
      const hasData = sectionData && Object.keys(sectionData).length > 0;
      const dataCount = hasData ? Object.keys(sectionData).filter(key => 
        sectionData[key] !== undefined && 
        sectionData[key] !== null && 
        sectionData[key] !== '' && 
        (!Array.isArray(sectionData[key]) || sectionData[key].length > 0)
      ).length : 0;
      logToFile(`  ✅ ${section}: ${hasData ? `${dataCount} fields with data` : 'empty'}`);
    });
    
    // Log complete JSON structure (first level only)
    logToFile('\n🔍 Complete Configuration Structure:');
    Object.keys(config).forEach(section => {
      logToFile(`\n📁 ${section}:`);
      const sectionData = config[section];
      if (sectionData && typeof sectionData === 'object') {
        Object.keys(sectionData).forEach(field => {
          const value = sectionData[field];
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              logToFile(`    ${field}: [${value.length} items] ${value.slice(0, 3).join(', ')}${value.length > 3 ? '...' : ''}`);
            } else if (typeof value === 'object') {
              logToFile(`    ${field}: [Object with ${Object.keys(value).length} properties]`);
            } else {
              logToFile(`    ${field}: ${String(value).substring(0, 50)}${String(value).length > 50 ? '...' : ''}`);
            }
          }
        });
      }
    });
    
    // Save to file for persistence (optional)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `form-submission-${timestamp}.json`;
    const filepath = path.join(__dirname, 'webhook-data', filename);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write data to file
    fs.writeFileSync(filepath, JSON.stringify(req.body, null, 2));
    logToFile(`💾 Data saved to: ${filename}`);
    
    // Simulate processing
    logToFile('⚙️ Processing configuration...');
    
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Configuration received and processed successfully',
      timestamp: new Date().toISOString(),
      dataReceived: {
        totalPages: req.body.totalPages,
        completedPages: req.body.completedPages,
        sectionsReceived: Object.keys(config).length
      },
      savedAs: filename
    });
    
    logToFile('✅ Response sent successfully\n');
    
  } catch (error) {
    logToFile('❌ Webhook error: ' + error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to process configuration',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Webhook server started');
  console.log(`📡 Listening on http://0.0.0.0:${PORT}`);
  console.log(`🔗 Webhook URL: http://0.0.0.0:${PORT}/webhook`);
  console.log(`💚 Health check: http://0.0.0.0:${PORT}/health`);
  console.log('\n⏳ Waiting for form submissions...\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down webhook server...');
  process.exit(0);
});