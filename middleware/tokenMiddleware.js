import jwt from "jsonwebtoken";
import "dotenv/config";

export function verifyAuthorToken(req, res, next) {
    // authentication header value
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" "); // split at the space
        const bearerToken = bearer[1]; // get token from array

        req.token = bearerToken; // insert token in the request
    } else {
        return res.status(401).json({ message: "Forbidden access. User token missing, please log in." });
    }

    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden access. Token is not valid" });
        }

        req.user = decodedUser.user;

        if (req.user.role === "AUTHOR") {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden access. You need 'Author' privileges" });
        }
    })
}

export function verifyUserToken(req, res, next) {
    // authentication header value
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" "); // split at the space
        const bearerToken = bearer[1]; // get token from array

        req.token = bearerToken; // insert token in the request
    } else {
        return res.status(500).json({ message: "Forbidden access. User token missing, please log in." });
    }

    //console.log("Middleware token check: ", req.token);

    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Forbidden access." });
        }

        //console.log("Middleware decoded User: ",decodedUser);

        req.user = decodedUser.user;

        //console.log("Middleware:",req.user);

        if (req.user.role === "USER" || req.user.role === "AUTHOR") {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden access. You need to be a registered user." });
        }
    })
}