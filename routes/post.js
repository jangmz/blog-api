import { Router } from "express";
import postsController from "../controllers/post.js";
import { verifyAuthorToken, verifyUserToken } from "../middleware/tokenMiddleware.js";

const postRouter = Router();

postRouter.get("/", postsController.getPublishedPosts); // public
postRouter.get("/all", verifyAuthorToken, postsController.getPosts); // published and unpublished
postRouter.get("/:postId", postsController.getPost); // unused
postRouter.post("/", verifyAuthorToken, postsController.postNewPost)
postRouter.delete("/:postId", verifyAuthorToken, postsController.deletePost);
postRouter.put("/:postId", verifyAuthorToken,postsController.updatePost);
postRouter.put("/publish/:postId", verifyAuthorToken,postsController.publishPost);
postRouter.put("/unpublish/:postId", verifyAuthorToken,postsController.unpublishPost);

export default postRouter;