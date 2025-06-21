import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "deliverables",
    allowed_formats: ["jpg", "png", "pdf", "zip", "docx"],
  },
});

const upload = multer({ storage });
export default upload;
