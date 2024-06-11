const {mongoose} = require('./db');
const monAnSchema = new mongoose.Schema(
    {
        tenMon:{type:String, required: true, unique: true},
        giaMon:{type: Number, require: true},
        hinhAnh: {type: String},
        id_loaiMonAn: {type: mongoose.Schema.Types.ObjectId, ref: 'LoaiMonAn'},
    },
    {
        collection: 'MonAn',
        timestamps: true
    }
);

let MonAn = mongoose.model('MonAn', monAnSchema);
module.exports = {MonAn};
