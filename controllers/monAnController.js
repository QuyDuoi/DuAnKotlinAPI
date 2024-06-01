const {MonAn} = require('../models/monAnModel');
const {LoaiMonAn} = require('../models/monAnModel');

exports.them_mon_an = async (req, res, next) => {
    try {
        const {tenMon, giaMon, hinhAnh, id_loaiMonAn} = req.body;

        // Kiểm tra loại món ăn có tồn tại không
        const loaiMonAn = await LoaiMonAn.findById(id_loaiMonAn);
        if (!loaiMonAn) {
            return res.status(400).json({"msg": 'Loại món ăn không tồn tại'});
        }

        // Kiểm tra tên món ăn đã tồn tại chưa
        const existingMonAn = await MonAn.findOne({tenMon});
        if (existingMonAn) {
            return res.status(400).json({"msg": 'Tên món ăn đã tồn tại'});
        }

        const monAn = new MonAn({tenMon, giaMon, hinhAnh, id_loaiMonAn});

        const kq = await monAn.save();

        res.status(201).json(kq);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.sua_mon_an = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {tenMon, giaMon, hinhAnh, id_loaiMonAn} = req.body;

        // Kiểm tra món ăn có tồn tại không
        const monAn = await MonAn.findById(id);
        if (!monAn) {
            return res.status(404).json({"msg": "Món ăn không tồn tại"});
        }

        // Kiểm tra tên món ăn mới đã tồn tại chưa
        const existingMonAn = await MonAn.findOne({tenMon});
        if (existingMonAn && existingMonAn._id.toString() !== id) {
            return res.status(400).json({"msg": 'Tên món ăn đã tồn tại'});
        }

        // Kiểm tra loại món ăn có tồn tại không
        const loaiMonAn = await LoaiMonAn.findById(id_loaiMonAn);
        if (!loaiMonAn) {
            return res.status(400).json({"msg": 'Loại món ăn không tồn tại'});
        }

        monAn.tenMon = tenMon;
        monAn.giaMon = giaMon;
        monAn.hinhAnh = hinhAnh;
        monAn.id_loaiMonAn = id_loaiMonAn;

        const kq = await monAn.save();

        res.status(200).json(kq);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

exports.xoa_mon_an = async (req, res, next) => {
    try {
        const {id} = req.params;

        const monAn = await MonAn.findByIdAndDelete(id);

        if (!monAn) {
            return res.status(404).json({"msg": "Món ăn không tồn tại"});
        }

        res.status(200).json({"msg": "Đã xóa món ăn"});
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
};

