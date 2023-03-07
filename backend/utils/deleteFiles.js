const fs = require("fs");
const deleteFiles = (files) => {
  try {
    if (!files?.length) return null;
   

    files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    return "deleted";
  } catch (e) {
    return null;
  }
};

module.exports = deleteFiles;
