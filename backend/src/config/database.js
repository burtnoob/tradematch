// File path: backend/src/config/database.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/tradematch';
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
            socketTimeoutMS: 45000, // Close sockets after 45s
            family: 4 // Use IPv4, skip trying IPv6
        };

        await mongoose.connect(connectionString, options);

        console.log('MongoDB Connected Successfully');

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
