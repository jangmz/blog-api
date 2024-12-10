import { Router } from "express";
import postsController from "../controllers/post.js";

const postRouter = Router();

postRouter.get("/", postsController.getPosts);
postRouter.get("/:postId", postsController.getPost);
postRouter.post("/", postsController.postNewPost)
postRouter.delete("/:postId", postsController.deletePost);
postRouter.put("/:postId", postsController.updatePost);
postRouter.put("/publish/:postId", postsController.publishPost);
postRouter.put("/unpublish/:postId", postsController.unpublishPost);

export default postRouter;