// File path: backend/src/config/config.js
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
    // Server configuration
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // MongoDB configuration
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tradematch',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    
    // JWT configuration
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    
    // Email configuration (for future use)
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD
    },
    
    // API configuration
    api: {
        prefix: '/api',
        version: 'v1'
    },
    
    // CORS configuration
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    }
};

export default config;
