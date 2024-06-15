const {mongoose} = require('./db');
const sanPhamSchema = new mongoose.Schema(
    {
        msss_name:{type:String, required: true, unique: true},
        msss_price: {type: Number, required: true},
        model_msss: {type: String, required: true},
        status_msss: {type: Boolean, required: true}
    },
    {
        collection: 'SanPham',
        timestamps: true
    }
);

let SanPham = mongoose.model('SanPham', sanPhamSchema);
module.exports = {SanPham};
