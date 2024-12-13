import userModel from "../models/userModel.js";
import refreshTokenModel from "../models/refreshTokenModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// POST /log-in -> check credentials, create JWT
async function userLogIn(req, res) {
    const { username, password } = req.body;

    try {
        // find username in DB
        const result = await userModel.findUserByUsername(username);
        const user = result[0];

        if (!user) {
            throw new Error("Username is incorrect.");
        }

        // password comparison
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password is incorrect.");
        }

        // generate JWT (access & refresh) & save refreshToken
        //console.log("First access token user object: ", user);
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        
        await refreshTokenModel.insertToken(refreshToken);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// POST /token -> grants user new access token
async function refreshToken(req, res) {
    const refreshToken = req.body.token;

    if (refreshToken === null) {
        return res.status(401);
    }

    if (!(await refreshTokenModel.tokenExists(refreshToken))) {
        return res.status(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Error refreshing token:", err);
            return res.status(403);
        }

        //console.log("Refresh token for user: ", user);
        const accessToken = generateAccessToken(user);

        res.json({ accessToken });
    })
}

// DELETE /log-out -> removes JWT
async function userLogOut(req, res) {
    // on log out remove refresh token in database
    try {
        await refreshTokenModel.deleteToken(req.body.token);
        res.status(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: "Error logging out."});
    }
}

// function for generating access token
function generateAccessToken(user) {
    //console.log("Generating access token for user: ", {user});
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export default {
    userLogIn,
    refreshToken,
    userLogOut,
}