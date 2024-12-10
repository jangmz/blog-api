import { Router } from "express";
import userController from "../controllers/user.js";
import userCreationValidation from "../validation/userValidation.js";

const usersRouter = Router();

usersRouter.post("/sign-up", userCreationValidation, userController.postUsers);
usersRouter.delete("/:userId", userController.deleteUser);

export default usersRouter;