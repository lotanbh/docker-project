const mongoose = require('mongoose');

async function connectDB() {
    try {
        // קטע קוד שעלול להיכשל
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lwblv9y.mongodb.net/${process.env.DB_NAME}`);
       
        console.log(process.env.DB_USER);
        console.log("😎 Mongo DB coonected successfully 😎");
        
    } catch (error) {
        // תופס את השגיאה ומאפשר להגיב בהתאם
        console.error("❌ DB connection failed ❌");
        
    }
}

// הפונקציה הזו זמינה לקבצים אחרים
module.exports = connectDB;