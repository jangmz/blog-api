import { body } from "express-validator";
import userModel from "../models/userModel.js";

const userCreationValidation = [
    body("username")
        .trim()
        .notEmpty()
        .custom(async (username) => {
            // check if username exists
            const user = await userModel.findUserByUsername(username);
            if (user.length !== 0) {
                console.log("Found username: ", user);
                throw new Error("User with this username already exists.");
            }
            return true;
        }),
    body("password1")
        .trim()
        .notEmpty()
        .isLength({ min: 8 }).withMessage("Password is too short, minimum of 8 characters are required.")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[\W_]/).withMessage("Password must contain at least one special character (#, $, !,...)"),
    body("password2")
        .trim()
        .notEmpty()
        .custom(async (value, { req }) => {
            // check if pass1 and pass2 match -> return true
            if (value !== req.body.password1) {
                throw new Error("Passwords don't match.");
            }
            return true;
        }),
    body("email")
        .trim()
        .notEmpty()
        .isEmail().withMessage("Email is not in the correct format. Enter it like so: example@mail.com")
        .custom(async (email) => {
            // check if email exists
            const user = await userModel.findUserByEmail(email);
            if (user.length !== 0) {
                console.log("Found mail: ", user);
                throw new Error("User with this email already exists.");
            }
            return true;
        }),
    body("role")
        .trim()
        .isIn(["USER", "AUTHOR"])
        .withMessage("Role can only be 'USER' or 'AUTHOR'.")
];

export default userCreationValidation;