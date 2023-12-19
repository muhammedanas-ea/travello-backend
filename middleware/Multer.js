import multer from "multer";

var storage = multer.diskStorage({
  destination: '../frontend/public/images',
  filename:  (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;