import express from "express";
import { login } from "../controllers/auth.js";
// import { AuthVerification} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// router.get("/authVerification", AuthVerification);

export default router;
