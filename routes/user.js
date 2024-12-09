import { Router } from "express";
import userController from "../controllers/user.js";
import userCreationValidation from "../validation/userValidation.js";

const usersRouter = Router();

usersRouter.get("/", userController.getUsers);
usersRouter.post("/sign-up", userCreationValidation, userController.postUsers);

export default usersRouter;