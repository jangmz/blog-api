import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
    res.json({
        message: "This is GET posts route.",
    })
})

export default postRouter;