// "http://localhost:3000"
require('dotenv').config();


// מייבא - root route "/"
const express = require('express'); 
const connectDB = require("./config/db");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require("./routes/users");

const http = require('http');

// מאזינים לפורט לוקאלי מסויים 
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    process.env.RENDER_EXTERNAL_URL
].filter(Boolean); // מסנן ערכים ריקים

//  מאתחל
const app = express();

connectDB();


// השרת שלנו יכול לפרסר מידע בצורת json
app.use(express.json());
// app.use(cors()); // מאפשר גישה בcors לכל הURLים
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
             callback(null, true);
            } else {
             callback(new Error('Not allowed by CORS policies'));
            }
        }
    })
);

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set in the environment variables.');
    process.exit(1); // Exit the application with an error code
}

// // מאפשר גישה בcors רק לURL שה Gord
// app.use(cors({
//     origin: "http://127.0.0.1:5501"
// }));

app.get("/health", (req , res) => {
    const dbStatus = ["connected", "disconnected", "connecting", "disconnecting"];
    const dbConnected = mongoose.connection.readyState === 1;

    res.status(dbConnected ? 200 : 503).json({
         status: dbConnected ? "OK" : "Error",
         db: dbStatus[mongoose.connection.readyState],
         runtime: `${Math.floor(process.uptime())} seconds`,
         environment: process.env.NODE_ENV || "development",
         timestamp: new Date().toISOString()
        });
});


app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

// app.get("/", (req , res) => {
//     res.send('Welcome to our users management app.');
// })
