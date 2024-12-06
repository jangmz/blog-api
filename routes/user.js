import { Router } from "express";
import userController from "../controllers/user.js";

const usersRouter = Router();

usersRouter.get("/", userController.getUsers);

export default usersRouter;