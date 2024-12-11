function verifyToken(req, res, next) {
    // authentication header value
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" "); // split at the space
        const bearerToken = bearer[1]; // get token from array

        req.token = bearerToken; // insert token in the request
        next();
    } else {
        res.status(403).json({ message: "Forbidden access." });
    }
}

export default {
    verifyToken,
}