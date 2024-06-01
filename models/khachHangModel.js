const {mongoose} = require('./db');

const khachHangSchema = new mongoose.Schema(
    {
        hoTen: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        hinhAnh: {type: String},
        soDienThoai: {type: String, required: true},
        soNha: {type: String},
        duong: {type: String},
        phuongQuanHuyen: {type: String},
    },
    {
        collection: 'KhachHang'
    }
);

let KhachHang = mongoose.model('KhachHang', khachHangSchema);
module.exports = {KhachHang};
