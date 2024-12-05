import { Router } from "express";

const commentRouter = Router();

commentRouter.get("/", (req, res) => {
    res.json({
        message: "This is GET comments route.",
    })
})

export default commentRouter;