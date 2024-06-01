const {mongoose} = require('./db');

const adminSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    {
        collection: 'Admin'
    }
);

let Admin = mongoose.model('Admin', adminSchema)
module.exports = {Admin};
