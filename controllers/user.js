import userModel from "../models/userModel.js";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// GET /users
function getUsers(req, res) {
    res.json({
        message: "This is GET users route.",
    })
}

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

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUsers,
    postUsers,
}