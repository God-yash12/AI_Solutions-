"use strict";

var path = require('path');
var fs = require('fs');
function removeFile(fileName) {
  // If fileName contains a path, strip it (just in case)
  var fileBaseName = path.basename(fileName);

  // Correct the file path by joining the base directory with the file name
  var filePath = path.join(__dirname, "../../public", fileBaseName);
  fs.access(filePath, fs.constants.F_OK, function (err) {
    if (err) {
      console.log("File not found:", filePath);
      return;
    }
    fs.unlink(filePath, function (error) {
      if (error) {
        console.log("Error while deleting file:", error.message);
      } else {
        console.log("File deleted successfully:", filePath);
      }
    });
  });
}
module.exports = removeFile;