module.exports = {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
    mongoDbName: process.env.MONGO_DB_NAME || 'user_information_webs',
    serverPort: process.env.SERVER_PORT || 3000,
    serverUrl : 'ws://localhost:3000',
};
