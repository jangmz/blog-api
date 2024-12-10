import { Router } from "express";
import commentsController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.post("/new", commentsController.postNewComment);
commentRouter.delete("/delete/:commentId", commentsController.deleteComment);

export default commentRouter;