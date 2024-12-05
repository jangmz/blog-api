import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.json({
        message: "This is GET users route.",
    })
})

export default usersRouter;