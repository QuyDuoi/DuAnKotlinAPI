const {mongoose} = require('./db');
const loaiMonAnSchema = new mongoose.Schema(
    {
        tenLoaiMon:{type:String, required: true, unique: true},
    },
    {
        collection: 'LoaiMonAn',
        timestamps: true
    }
);

let LoaiMonAn = mongoose.model('LoaiMonAn', loaiMonAnSchema);
module.exports = {LoaiMonAn};
