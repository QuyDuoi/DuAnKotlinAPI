const {LoaiMonAn} = require('../models/loaiMonAnModel');

exports.them_loai_mon_an = async (req, res, next) => {
    try {
        const {tenLoaiMon} = req.body;

        // Kiểm tra tên loại món ăn đã tồn tại chưa
        const existingLoaiMonAn = await LoaiMonAn.findOne({tenLoaiMon});
        if (existingLoaiMonAn) {
            return res.status(400).json({"msg": 'Tên loại món ăn đã tồn tại'});
        }

        const loaiMonAn = new LoaiMonAn({tenLoaiMon});

        const kq = await loaiMonAn.save();

        res.status(201).json(kq);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.sua_loai_mon_an = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {tenLoaiMon} = req.body;

        const loaiMonAn = await LoaiMonAn.findById(id);

        if (!loaiMonAn) {
            return res.status(404).json({"msg": "Loại món ăn không tồn tại"});
        }

        // Kiểm tra tên loại món ăn mới đã tồn tại chưa
        const existingLoaiMonAn = await LoaiMonAn.findOne({tenLoaiMon});
        if (existingLoaiMonAn && existingLoaiMonAn._id.toString() !== id) {
            return res.status(400).json({"msg": 'Tên loại món ăn đã tồn tại'});
        }

        loaiMonAn.tenLoaiMon = tenLoaiMon;

        const kq = await loaiMonAn.save();

        res.status(200).json(kq);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.xoa_loai_mon_an = async (req, res, next) => {
    try {
        const {id} = req.params;

        const loaiMonAn = await LoaiMonAn.findByIdAndDelete(id);

        if (!loaiMonAn) {
            return res.status(404).json({"msg": "Loại món ăn không tồn tại"});
        }

        res.status(200).json({"msg": "Đã xóa loại món ăn"});
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.lay_danh_sach_loai_mon_an = async (req, res, next) => {
    try {
        const danhSachLoaiMonAn = await LoaiMonAn.find().sort({ createdAt: -1 });
        res.status(200).json(danhSachLoaiMonAn);
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
};