import { Router } from "express";
import postsController from "../controllers/post.js";

const postRouter = Router();

postRouter.get("/", postsController.getPosts);
postRouter.post("/new", postsController.postNewPost)
postRouter.delete("/delete/:postId", postsController.deletePost);
postRouter.put("/update/:postId", postsController.updatePost);
postRouter.get("/:postId/comments", postsController.getPost);

export default postRouter;