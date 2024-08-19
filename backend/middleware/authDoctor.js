const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; 

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.doctor = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error });
    }
};
