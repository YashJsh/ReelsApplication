import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define URI in .env")
}

let cached = global.mongoose;

if (!cached){
    global.mongoose = {conn : null, promise : null}
}

export async function connectToDatabase(){
    if (cached.conn){   // If has connection, then return the connection
        return cached.conn
    };

    if (!cached.promise){ // If it not has promise but it is one the way. 
        cached.promise = mongoose
        .connect(MONGODB_URI)
        .then(()=> mongoose.connection)
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn
}   