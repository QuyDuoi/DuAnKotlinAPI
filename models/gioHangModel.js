const {mongoose} = require('./db');

const giohangSchema = new mongoose.Schema(
    {
        customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang', required: true}
    },
    {
        collection: 'GioHang'
    }
);

let GioHang = mongoose.model('GioHang', giohangSchema);
module.exports = {GioHang};
