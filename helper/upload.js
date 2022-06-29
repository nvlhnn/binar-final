const multer = require("multer");
const storage = require("../services/multerStorage.service");

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb("Profile picture should be an image", false);
    }
  },
  limits: { fieldSize: 5 * 1024 * 1024 * 1024 },
});

module.exports = upload;
