#!/bin/bash

# Navigate to the client folder
echo "Navigating to the client folder..."
cd client || { echo "Client folder not found! Exiting."; exit 1; }

# Install client dependencies
echo "Installing client dependencies..."
npm install

# Start the client application
echo "Starting the client application..."
npm run dev &  # Running in the background

# Navigate back to the root folder
cd ..

# Navigate to the server folder
echo "Navigating to the server folder..."
cd server || { echo "Server folder not found! Exiting."; exit 1; }

# Install server dependencies
echo "Installing server dependencies..."
npm install

# Start the server application
echo "Starting the server application..."
npm start

# Wait for user input to close the script
read -p "Press enter to exit..."