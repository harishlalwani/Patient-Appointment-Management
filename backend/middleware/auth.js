const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; 
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error });
    }
};

exports.verifySocketToken = (socket, next) => {

    const token = socket.handshake.auth.token || socket.handshake.headers['authorization'];
    if (!token) {
        next(new Error('No token, authorization denied'));
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        socket.user = decoded;
        next();
    } catch (error) {
        next(new Error('Token is not valid'));
    }
};
