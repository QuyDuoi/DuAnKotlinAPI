const {SanPham} = require('../models/sanPhamModel');

exports.them = async (req, res, next) => {
    try {
        const {msss_name, msss_price, model_msss, status_msss} = req.body;

        // Kiểm tra tên loại món ăn đã tồn tại chưa
        const existingName = await SanPham.findOne({msss_name});
        if (existingName) {
            return res.status(400).json({"msg": 'Tên sản phẩm đã tồn tại'});
        }

        const sanPham = new SanPham({msss_name, msss_price, model_msss, status_msss});

        const kq = await sanPham.save();

        res.status(201).json(kq);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.sua = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {msss_name, msss_price, model_msss, status_msss} = req.body;

        const sanPham = await SanPham.findById(id);

        if (!sanPham) {
            return res.status(404).json({"msg": "Sản phẩm không tồn tại"});
        }

        // Kiểm tra tên loại món ăn mới đã tồn tại chưa
        const existingSanPham = await SanPham.findOne({msss_name});
        if (existingSanPham && existingSanPham._id.toString() !== id) {
            return res.status(400).json({"msg": 'Tên sản phẩm đã tồn tại'});
        }

        sanPham.msss_name = msss_name;
        sanPham.msss_price = msss_price;
        sanPham.model_msss = model_msss;
        sanPham.status_msss = status_msss;

        const kq = await sanPham.save();

        res.status(200).json(kq);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.xoa = async (req, res, next) => {
    try {
        const {id} = req.params;

        const sanPham = await SanPham.findByIdAndDelete(id);

        if (!sanPham) {
            return res.status(404).json({"msg": "Sản phẩm không tồn tại"});
        }

        res.status(200).json({"msg": "Đã xóa sản phẩm"});
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.lay_danh_sach = async (req, res, next) => {
    try {
        const danhSach = await SanPham.find().sort({ createdAt: -1 });
        res.status(200).json(danhSach);
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
};

exports.xem_chi_tiet = async (req, res, next) => {
    try {
        const {id} = req.params;

        const sanPham = await SanPham.findById(id);

        if (!sanPham) {
            return res.status(404).json({"msg": "Sản phẩm không tồn tại"});
        }

        res.status(200).json(sanPham)
    } catch (error) {
        res.status(400).json({"msg": error.message})
    }
}