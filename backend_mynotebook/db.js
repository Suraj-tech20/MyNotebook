const mongoose = require('mongoose');
const database_uri = 'mongodb://localhost:27017/mynotebook'
const connect = () => {
    mongoose.connect(database_uri, () => {
        console.log('connect to mongodb');
    });
}
module.exports = connect;