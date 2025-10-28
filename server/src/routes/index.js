import { Router } from "express";
import bookRouter from "./bookRoutes.js";
import searchRouter from "./searchRoutes.js"

const router = Router();

router.use("/books", bookRouter);
router.use("/search", searchRouter);

export default router;