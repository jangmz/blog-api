import { Router } from "express";
import commentsController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.get("/", commentsController.getComments);

export default commentRouter;