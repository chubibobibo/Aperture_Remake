/** @multer coverts the data from the form into usable objects */
import multer from "multer";
import path from "path";

/** @storage stores the data converted into objects in disk */
/** @destination determines where the uploaded files should be stored */
/** @filename determines what the uploaded file will be named*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/public/uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

/** @upload middleware will be implemented in the routes where uploading images is implemented */
const upload = multer({ storage: storage });
export default upload;
