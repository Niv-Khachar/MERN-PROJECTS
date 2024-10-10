// In db.js
const mongoose = require('mongoose');

async function mongoDB() {
    try {
        await mongoose.connect('mongodb+srv://usernamekhana:usernamekhana56@clusterforkhana.olfyn.mongodb.net/khanadb?retryWrites=true&w=majority&appName=ClusterforKhana', {
        });
        console.log('MongoDB connected successfully');

        const fetched_data = await mongoose.connection.db.collection('khana').find({}).toArray(async function (err, data) {

            const foodCategory = await mongoose.connection.db.collection('khanacategary').find({}).toArray(function (err, catData) {
                if (err) {
                    console.log(err);
                }
                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                    console.log();


                }
            })

        });


    } catch (err) {
        console.log('MongoDB connection error:', err);
    }
}

module.exports = mongoDB; // Export the function
