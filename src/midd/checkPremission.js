import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/users';
dotenv.config();
const { SECRET_KEY } = process.env;
export const checkPermission = async (req, res, next) => {
    try {
        //B1: Kiểm tra header có token chưa?
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                message: "Bạn chưa đăng nhập!",
            })
        }
        //B2: Verify token để lấy account
        const decode = jwt.verify(token, SECRET_KEY);
        const account = await users.findById(decode._id);
        if (!account) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại trong hệ thống!",
            });
        } if (account.role !== "admin") {
            return res.status(400).json({
                message: "Bạn không có quyền làm việc này!",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}