import { Router } from "express";
import postsController from "../controllers/post.js";

const postRouter = Router();

postRouter.get("/", postsController.getPosts);

export default postRouter;