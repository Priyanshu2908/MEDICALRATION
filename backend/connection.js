const mongoose = require('mongoose');

const url = 'mongodb+srv://PriyanshuChaubey_29:Priyanshu2908@mediration.dwygjil.mongodb.net/mediRation?retryWrites=true&w=majority&appName=mediration'

mongoose.connect(url)
.then((result) => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;