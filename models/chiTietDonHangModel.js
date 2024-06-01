const {mongoose} = require('./db');

const chiTietDonHangSchema = new mongoose.Schema(
    {
        id_donHang: {type: mongoose.Schema.Types.ObjectId, ref: 'DonHang', required: true},
        id_monAn: {type: mongoose.Schema.Types.ObjectId, ref: 'MonAn', required: true},
        soLuong: {type: Number, required: true}
    },
    {
        collection: 'ChiTietDonHang'
    }
);

let ChiTietDonHang = mongoose.model('ChiTietDonHang', chiTietDonHangSchema);
module.exports = {ChiTietDonHang};
