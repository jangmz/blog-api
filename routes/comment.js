import { Router } from "express";
import commentsController from "../controllers/comment.js";
import { verifyUserToken } from "../middleware/tokenMiddleware.js";

const commentRouter = Router();

commentRouter.post("/", verifyUserToken, commentsController.postNewComment);
commentRouter.delete("/:commentId", verifyUserToken, commentsController.deleteComment);

export default commentRouter;