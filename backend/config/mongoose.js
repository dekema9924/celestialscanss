

const mongoose = require('mongoose');
const { MongooseUrl } = require('./url');

try {
    mongoose.connect(MongooseUrl).then(() => {
        const state = mongoose.connection.readyState
        const dbName = mongoose.connection.name;

        console.log(`mongoose ${state === 1 ? 'connected' : 'not connected'} to Database name:, ${dbName}`);
    })


} catch (err) {
    console.error('Error connecting to MongoDB:', err);
}