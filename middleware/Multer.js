import multer from "multer";

var storage = multer.diskStorage({
  destination: 'public',
  filename:  (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
