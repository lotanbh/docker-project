// "http://localhost:3000"
require('dotenv').config();


// מייבא - root route "/"
const express = require('express'); 
const connectDB = require("./config/db");
const cors = require('cors');

const userRoutes = require("./routes/users");

const http = require('http');

// מאזינים לפורט לוקאלי מסויים 
const PORT = process.env.PORT || 3000;

//  מאתחל
const app = express();

connectDB();


// השרת שלנו יכול לפרסר מידע בצורת json
app.use(express.json());
app.use(cors()); 

// // מאפשר גישה בcors רק לURL שהגודר
// app.use(cors({
//     origin: "http://127.0.0.1:5501"
// }));



app.use(express.static('public'));

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

app.get("/", (req , res) => {
    res.send('Welcome to our users management app.');
})
