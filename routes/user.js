import { Router } from "express";
import userController from "../controllers/user.js";
import userCreationValidation from "../validation/userValidation.js";
import { verifyUserToken } from "../middleware/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.post("/sign-up", userCreationValidation, userController.postUsers);
usersRouter.delete("/:userId", verifyUserToken, userController.deleteUser);

export default usersRouter;