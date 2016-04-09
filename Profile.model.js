var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profileSchema = new Schema({
    name: String,
    role: String
});
module.exports = mongoose.model('profile', profileSchema);