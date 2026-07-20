import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login first",
            });
        }

        const decoded = jwt.verify(
            token,
            "smartschoolsecret"
        );

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;