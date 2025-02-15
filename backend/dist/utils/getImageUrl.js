"use strict";

require("dotenv").config();
function getImageUrl(fileName) {
  if (fileName.startsWith("http")) {
    return fileName;
  }
  // Otherwise, prepend the base URL from environment variables
  return "".concat(process.env.BACKEND_URL, "/public/").concat(fileName);
}
module.exports = getImageUrl;