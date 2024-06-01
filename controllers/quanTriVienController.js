const {Admin} = require('../models/quanTriVienModel');

exports.them_quan_tri_vien = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        const objAdmin = new Admin({
            name,
            email,
            password
        });

        const kq = await objAdmin.save();

        res.status(201).json(kq);

    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
}