import { Router } from "express";
import user from "./user.js";
import post from "./post.js";
import comment from "./comment.js";

const home = Router();

home.get("/", (req, res) => {
    res.json({
        message: "This is GET home page",
    })
})

export default {
    home,
    user,
    post,
    comment,
}