import { Router } from "express";
import user from "./user.js";
import post from "./post.js";
import comment from "./comment.js";
import homeController from "../controllers/index.js";

const home = Router();

home.get("/", homeController.getHome);

export default {
    home,
    user,
    post,
    comment,
}