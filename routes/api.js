const express = require('express');
const router = express.Router();
const {them, sua, xoa, lay_danh_sach, xem_chi_tiet} = require('../controllers/sanPhamController');
const upload = require('../config/upload');

router.post('/them', them);
router.put('/sua/:id', sua);
router.delete('/xoa/:id', xoa);
router.get('/layDanhSach', lay_danh_sach);
router.post('/xemChiTiet/:id', xem_chi_tiet);

module.exports = router;