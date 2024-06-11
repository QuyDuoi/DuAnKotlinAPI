const express = require('express');
const router = express.Router();
const {them_quan_tri_vien} = require('../controllers/quanTriVienController');
const {them_loai_mon_an, sua_loai_mon_an, xoa_loai_mon_an, lay_danh_sach_loai_mon_an} = require('../controllers/loaiMonController');
const {them_mon_an, sua_mon_an, xoa_mon_an, lay_danh_sach_mon_an} = require('../controllers/monAnController');
const upload = require('../config/upload');

router.post('/themQuanTriVien', them_quan_tri_vien);

router.post('/themLoaiMon', them_loai_mon_an);
router.put('/suaLoaiMon/:id', sua_loai_mon_an);
router.delete('/xoaLoaiMon/:id', xoa_loai_mon_an);
router.get('/layDanhSachLoaiMon', lay_danh_sach_loai_mon_an);

router.post('/themMonAn', upload.single('hinhAnh'), them_mon_an);
router.put('/suaMonAn/:id', upload.single('hinhAnh'), sua_mon_an);
router.delete('/xoaMonAn/:id', xoa_mon_an);
router.get('/layDanhSachMonAn', lay_danh_sach_mon_an)

module.exports = router;