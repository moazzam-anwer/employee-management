import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number
}

const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to MongoDB');
        return;
    } 
    const uri = process.env.MONGODB_URI ||'';
    try {
        const db = await mongoose.connect(uri, {
        });

        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Database connection  failed", error);
    }
}

export default dbConnect;