import { Router } from "express";
import { searchBooks } from "../controllers/bookController.js";

const router = Router();

router.get('/', searchBooks);

export default router;