const {mongoose} = require('./db');

const donHangSchema = new mongoose.Schema(
    {
        id_khachHang: {type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang', required: true},
        thoiGianDatHang: {type: Date, default: Date.now},
        trangThai: {type: String, required: true, enum: ['pending', 'confirmed', 'rejected']}
    },
    {
        collection: 'DonHang'
    }
);

let DonHang = mongoose.model('DonHang', donHangSchema);
module.exports = {DonHang};
