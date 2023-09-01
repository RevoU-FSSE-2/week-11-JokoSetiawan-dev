"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Unauthorized" });
    }
    else {
        const token = authHeader.split(" ")[0];
        console.log(authHeader, "authHeader");
        next();
    }
};
exports.default = authenticationMiddleware;
