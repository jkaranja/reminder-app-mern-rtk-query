const cleanFiles = (files) => {
  return files?.map((file) => ({
    path: `${file.destination}/${file.filename}`,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
  }));
};


module.exports = cleanFiles