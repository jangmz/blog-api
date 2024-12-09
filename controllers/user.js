import userModel from "../models/userModel.js";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// GET /users
function getUsers(req, res) {
    res.json({
        message: "This is GET users route.",
    })
}

// POST /users -> create a user, validate input
async function postUsers(req, res) {
    // check for any errors
    const errors = validationResult(req); // should return errors but didn't

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    // if there are no errors, save data
    const user = req.body;
    console.log("Inputed data: ", user);
    console.log("Inputed data: ", req.body);

    try {
        // encrypt password
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password1, saltRounds);

        // insert into DB
        // await userModel.createUser(user);
        console.log("New user added: ", user);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUsers,
    postUsers,
}