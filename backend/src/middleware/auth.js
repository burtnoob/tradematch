// File path: backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user
            const user = await User.findById(decoded.userId)
                .select('-password');

            if (!user) {
                throw new Error();
            }

            if (!user.isActive) {
                return res.status(401).json({ message: 'User account is deactivated' });
            }

            // Add user to request object
            req.user = user;
            next();

        } catch (err) {
            res.status(401).json({ message: 'Token is invalid or expired' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default auth;
