import { Router } from "express";
import commentsController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.post("/", commentsController.postNewComment);
commentRouter.delete("/:commentId", commentsController.deleteComment);

export default commentRouter;