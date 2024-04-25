import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet"; // for request seafty
import multer from "multer"; //for file upload
import morgan from "morgan"; // for login

//these allow us co configure the path when we configure directories
import path from "path";
import { fileURLToPath } from "url";

// that are simple function or logical endpoint code which is also known as controllers
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
// these are routes which simplifies the routing
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import verifyToken from "./middleware/auth.js";

// import BSUser from "./models/user.js";
// import BSPost from "./models/post.js";
// import { users, posts } from "./data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* conncting to Database */
const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log(`Server is listening on Port http://localhost:${PORT}`);

    // Adding Bunch of data forcefully
    // BSUser.insertMany(users);
    // BSPost.insertMany(posts);
  });
};

connectDB().catch((err) => console.error(`${err} did not connect!`));
