#!/bin/bash

# Navigate to the backend directory
cd ./back-nest

# Start backend in a new terminal window
gnome-terminal --tab --title="Backend" -- npm run start:dev

# Navigate to the frontend directory
cd ../front-react

# Start frontend in a new terminal window
gnome-terminal --tab --title="Frontend" -- npm start
