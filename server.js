const WebSocket = require('ws');
const { MongoClient } = require('mongodb');
const config = require('./config');
// const server = new WebSocket.Server({ host: '0.0.0.0', port: config.serverPort });

const server = new WebSocket.Server({ port: config.serverPort });

// Function to connect to MongoDB and handle user information
async function handleUserInformation(userInfo) {
    const client = new MongoClient(config.mongoUrl, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(config.mongoDbName);
        const collection = db.collection('user_information_ws');

        // Insert user information into the database
        await collection.insertOne(userInfo);
        console.log('User information stored in MongoDB:', userInfo);

        // Fetch all stored user information and print
        const storedData = await collection.find({}).toArray();
        console.log('Data stored in the database:', storedData);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

server.on('connection', (socket) => {
    console.log('Client connected');

    // Event handler for receiving messages from the client
    socket.on('message', (message) => {
        const userInfo = JSON.parse(message);
        console.log('User Information received from client:', userInfo);

        // Store user information in MongoDB and print the data
        handleUserInformation(userInfo);

        // Send a response back to the client
        socket.send('Thanks Buddy');
    });

    // Event handler for when the connection is closed
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
