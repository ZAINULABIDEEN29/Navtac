import multer from "multer";
import fs from "fs";
import path from "path";

// Vercel handles filesystems differently (read-only except for /tmp)
const isVercel = process.env.VERCEL === "1";

// Fallback to /tmp folder if on Vercel, otherwise use local public/uploads
const uploadDir = isVercel ? "/tmp" : path.join(process.cwd(), "public/uploads");

// Make sure the local directory exists so Multer doesn't throw ENOENT
if (!isVercel && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
export default upload;