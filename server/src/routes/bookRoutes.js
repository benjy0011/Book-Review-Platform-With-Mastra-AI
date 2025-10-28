import { Router } from "express";
import { getBookById, getBooks, submitReviewToBook } from "../controllers/bookController.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/:id/reviews", submitReviewToBook)

export default router;