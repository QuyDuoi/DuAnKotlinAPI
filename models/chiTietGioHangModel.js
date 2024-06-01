const {mongoose} = require('./db');

const chiTietGioHangSchema = new mongoose.Schema(
    {
        id_gioHang: {type: mongoose.Schema.Types.ObjectId, ref: 'GioHang', required: true},
        id_monAn: {type: mongoose.Schema.Types.ObjectId, ref: 'MonAn', required: true},
        soLuong: {type: Number, required: true}
    },
    {
        collection: 'ChiTietGioHang'
    }
);

let ChiTietGioHang = mongoose.model('ChiTietGioHang', chiTietGioHangSchema);
module.exports = {ChiTietGioHang};
