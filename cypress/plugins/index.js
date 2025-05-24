const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    fileExists(filePath) {
      const fullPath = path.join(__dirname, '..', '..', 'cypress', 'downloads', filePath);
      return fs.existsSync(fullPath);  // This will return true if the file exists, false if it does not
    }
  });
};
