import jwt from "jsonwebtoken";
import "dotenv/config";

export function extractAndVerifyJWT(req, res, next) {
    // authentication header value
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" "); // split at the space
        const bearerToken = bearer[1]; // get token from array

        req.token = bearerToken; // insert token in the request
    } else {
        return res.status(500).json({ message: "Internal error with JWT (req)." });
    }

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden access." });
        }

        req.user = authData;
        next();
    })
}