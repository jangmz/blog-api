import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /log-in -> check credentials, create JWT
async function userLogIn(req, res) {
    const { username, password } = req.body;

    try {
        // find username in DB
        const result = await userModel.findUserByUsername(username);
        console.log("Found results: ", result);
        const user = result[0];
        if (!user) {
            throw new Error("Username is incorrect.");
        }

        // password comparison
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password is incorrect.");
        }

        // generate & send JWT
        console.log("Generating token...");
        jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
            if (err) {
                throw new Error("Generating JWT failed.");
            }

            res.status(200).json({ token });
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// POST /log-out -> removes JWT

export default {
    userLogIn,
}