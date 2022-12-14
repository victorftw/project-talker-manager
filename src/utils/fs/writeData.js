const fs = require('fs').promises;

const writeFile = async (data, path) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.log('Error on write file', err.message);
    return false;
  }
};

module.exports = { writeFile };