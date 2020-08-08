const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserRegSchema = new Schema(
    {
        email:{type: String, required: true},
        timestamp:{type: String},
        ip:{type: String}
    }
);

module.exports  = mongoose.model('UserRegisteration', UserRegSchema);