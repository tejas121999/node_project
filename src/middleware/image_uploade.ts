import multer, { Multer } from "multer"
import path from "path"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/images")
    },
    // destination: "../public/images",
    filename: (req, file, cb) => {
        // console.log("file", file)
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

// export const upload = multer({ storage: storage })

export const upload = multer({
    storage: storage,
});