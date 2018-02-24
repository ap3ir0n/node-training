const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    facebookId: String
});

mongoose.model('User', userSchema);
