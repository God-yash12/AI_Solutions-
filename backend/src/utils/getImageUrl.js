require("dotenv").config();

function getImageUrl(fileName) {
 
  if (fileName.startsWith("http")) {
    return fileName; 
  }
  // Otherwise, prepend the base URL from environment variables
  return `${process.env.BACKEND_URL}/public/${fileName}`;
}

module.exports = getImageUrl;
