import user from "./user.js";
import post from "./post.js";
import comment from "./comment.js";
import { Router } from "express";
import indexController from "../controllers/index.js";

const index = Router();

index.post("/log-in", indexController.userLogIn);
index.delete("/log-out", indexController.userLogOut);
index.post("/token", indexController.refreshToken);

export default {
    user,
    post,
    comment,
    index
}