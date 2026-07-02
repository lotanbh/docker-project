const mongoose = require('mongoose');

async function connectDB() {
    try {
        // קטע קוד שעלול להיכשל
        // await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lwblv9y.mongodb.net/${process.env.DB_NAME}`);
       
        // console.log(process.env.DB_USER);
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        await mongoose.connect(uri)

        console.log("😎 Mongo DB coonected successfully 😎");
        
    } catch (error) {
        // תופס את השגיאה ומאפשר להגיב בהתאם
        console.error("❌ DB connection failed ❌", error.message);
        process.exit(1); // יציאה מהאפליקציה עם קוד שגיאה
        
    }
}

// הפונקציה הזו זמינה לקבצים אחרים
module.exports = connectDB;