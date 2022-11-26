import multer from "multer";

const storage = multer.diskStorage({
  destination(_, __, callback) {
    callback(null, "public/images/")
  },

  filename(_, file, callback) {
    callback(null, file.originalname)
  },
})

export const uploadMiddleware = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } }).single("image");
