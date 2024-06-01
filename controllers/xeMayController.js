const {XeMay} = require('../models/xeMayModel');

exports.lay_ds = async (req, res, next)=>{
    let dieuKien = null;
    try {
        if(typeof(req.query.tenxe) != 'undefined'){
            dieuKien = {ten_xe_ph1234: req.query.tenxe }
        }
 
        let list = await XeMay.find(dieuKien);
        res.status(200).json(list);

    } catch (error) {
        res.status(400).json({"msg":error.message()});
    }
}

exports.xem_chi_tiet = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let objXe = await XeMay.findById(id);
        res.status(200).json(objXe);

    } catch (error) {
        res.status(400).json({"msg":error.message()});
    }
}

exports.them_xe = async (req, res, next)=>{
    try {
        let {ten_xe_ph1234,mau_sac_ph1234, gia_ban_ph1234,mo_ta_ph1234,hinh_anh_ph1234} = req.body;
        if(ten_xe_ph1234.length < 3){
            return res.status(400).json({"msg":'Tên xe phải nhập ít nhất 3 ký tự'});
        }

        // tạo đối tượng: 
        let objXe = new XeMay();
        objXe.ten_xe_ph1234 = ten_xe_ph1234;
        objXe.mau_sac_ph1234 = mau_sac_ph1234;
        objXe.gia_ban_ph1234 = gia_ban_ph1234;
        objXe.mo_ta_ph1234 = mo_ta_ph1234;
        objXe.hinh_anh_ph1234 = hinh_anh_ph1234;
        
        let kq = await objXe.save();

        res.status(201).json(kq);
        
    } catch (error) {
        res.status(400).json({"msg":error.message()});
    }
}