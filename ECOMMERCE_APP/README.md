#Getting Started
Follow the steps below to set up the project on your local machine.

#Prerequisites
Make sure you have the following installed:

1. Node.js
2. npm
3. MongoDB (or access to MongoDB Atlas)

#Installation
Clone the repository

git clone <repository-url>
cd <project-folder>
Install dependencies
npm install

#Run Angular frontend (if applicable)
ng serve

#Install required backend packages Make sure the following packages are installed:
npm install express mongoose cors body-parser

#Set up MongoDB connection In your index.js or app.js, update the MONGO_URI:

const MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority";
// Replace <username>, <password>, and <database-name> with your actual MongoDB credentials.

Configure Port Define the port your backend will run on:

const PORT = process.env.PORT || 4100;
CORS Setup Make sure to configure CORS to allow requests from the frontend:

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:4200" // Replace with your frontend port if different
}));

Run the server
node index.js
