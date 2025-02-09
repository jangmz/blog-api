import userModel from "../models/userModel.js";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// POST /users/sign-up -> create a user, validate input
async function postUsers(req, res) {
    // check for any errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    // if there are no errors, save data
    const user = req.body;

    try {
        // encrypt password
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password1, saltRounds);
        delete user.password1;
        delete user.password2;

        // insert into DB
        await userModel.createUser(user);

        res.status(200).json({ message: "Sign up successfull." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /users/:userId 
async function deleteUser(req, res) {
    const userId = parseInt(req.params.userId);

    if (userId !== req.user.id) {
        return res.status(403).json({ message: "You do not have permissions for that action." });
    }

    try {
        await userModel.deleteUser(userId);

        res.status(200).json({ message: "User account successfully deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// PUT /users/:userId
async function updateUser(req, res) {
    // check for any errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    // if there are no errors, save data*/
    const user = req.body;

    console.log("New user data: ", user);

    try {
        const updatedUser = await userModel.updateUser(user);
        console.log("Updated data: ", updatedUser)
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }    
}

export default {
    postUsers,
    deleteUser,
    updateUser,
}