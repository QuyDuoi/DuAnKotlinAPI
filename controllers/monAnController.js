const {MonAn} = require('../models/monAnModel');
const {LoaiMonAn} = require('../models/monAnModel');

exports.them_mon_an = async (req, res, next) => {
    try {
        const { tenMon, giaMon, id_loaiMonAn } = req.body;
        let hinhAnh = '';

        if (req.file) {
            hinhAnh = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
        }

        // Check if the dish category exists
        // const loaiMonAn = await LoaiMonAn.findById(id_loaiMonAn);
        // if (!loaiMonAn) {
        //     return res.status(400).json({ msg: 'Loại món ăn không tồn tại' });
        // }

        // Check if the dish name already exists
        const existingMonAn = await MonAn.findOne({ tenMon });
        if (existingMonAn) {
            return res.status(400).json({ msg: 'Tên món ăn đã tồn tại' });
        }

        const monAn = new MonAn({ tenMon, giaMon, hinhAnh, id_loaiMonAn });

        const kq = await monAn.save();

        res.status(201).json(kq);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Method to update a dish
exports.sua_mon_an = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { tenMon, giaMon, id_loaiMonAn } = req.body;

        // Check if the dish exists
        const monAn = await MonAn.findById(id);
        if (!monAn) {
            return res.status(404).json({ msg: 'Món ăn không tồn tại' });
        }

        // Check if the new dish name already exists
        const existingMonAn = await MonAn.findOne({ tenMon });
        if (existingMonAn && existingMonAn._id.toString() !== id) {
            return res.status(400).json({ msg: 'Tên món ăn đã tồn tại' });
        }

        // Check if the dish category exists
        const loaiMonAn = await LoaiMonAn.findById(id_loaiMonAn);
        if (!loaiMonAn) {
            return res.status(400).json({ msg: 'Loại món ăn không tồn tại' });
        }

        monAn.tenMon = tenMon;
        monAn.giaMon = giaMon;
        monAn.id_loaiMonAn = id_loaiMonAn;

        // Update the image URL if a new file is uploaded
        if (req.file) {
            monAn.hinhAnh = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
        }

        const kq = await monAn.save();

        res.status(200).json(kq);
    } catch (error) {
        res.status(400).json({ msg: error.message });
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

exports.lay_danh_sach_mon_an = async (req, res, next) => {
    try {
        const monAns = await MonAn.find().sort({ createdAt: -1 });

        res.status(200).json(monAns);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

