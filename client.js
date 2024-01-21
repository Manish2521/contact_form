// const config = require('./config');


document.addEventListener('DOMContentLoaded', function () {

    const socket = new WebSocket('ws://localhost:3000');
    // const socket = new WebSocket(config.serverUrl.replace('ws:', 'wss:'));

    // Event handler for when the connection is established
    socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
    });

    // Event handler for receiving messages from the server
    socket.addEventListener('message', (event) => {
        const responseDisplay = document.getElementById('responseDisplay');
        responseDisplay.textContent = event.data;
    });

    // Event handler for errors
    socket.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
    });

    // Event handler for when the connection is closed
    socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });

    // Function to send the user information to the server
    function sendMessage() {
        const nameInput = document.getElementById('nameInput').value;
        const emailInput = document.getElementById('emailInput').value;
        const phoneInput = document.getElementById('phoneInput').value;
        const messageInput = document.getElementById('messageInput').value;

        const userInfo = {
            name: nameInput,
            email: emailInput,
            phone: phoneInput,
            message: messageInput
        };

        // Sending the user information as a string to the server
        socket.send(JSON.stringify(userInfo));


        // After sending the message, show the responseDisplay div
        const responseDisplay = document.getElementById('responseDisplay');
        responseDisplay.classList.remove('hidden');
    }

    // Prevent form submission on button click
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        sendMessage();
    });
});
