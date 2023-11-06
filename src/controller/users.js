
import users from "../models/users";
import { signInValid, signUpValid } from "../validations/users"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRET_KEY } = process.env;

export const signUp = async (req, res) => {
    try {
        //Bước 1: Kiểm tra thông tin gửi về từ client
        const { error } = signUpValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        //Bước 2: Kiểm tra email đã tồn tại trong hệ thống chưa
        const userExists = await users.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
            })
        }
        //Bước 3: Mã hóa mật khẩu
        const hashPassword = await bcryptjs.hash(req.body.password, 10);
        //Bước 4: Tạo account người dùng
        const account = await users.create({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword
        })
        //Bước 5: trả về thông báo
        account.password = undefined;
        return res.status(200).json({
            message: "Tạo tài khoản thành công!",
            account
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        // B1: Validation data from client
        const { error } = signInValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                messages: errors
            })
        }
        //B2: Kiểm tra email có tồn tại trong database chưa?
        const account = await users.findOne({ email: req.body.email });
        if (!account) {
            return res.status(400).json({
                message: "Email này chưa được đăng ký",
            })
        }
        //B3: So sámh password có đúng không?
        const isMatch = await bcryptjs.compare(req.body.password, account.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng, vui lòng nhập lại"
            })
        }
        //B4: Tạo JWT
        const accsessToken = jwt.sign({ _id: account.id }, SECRET_KEY, { expiresIn: "2h" });
        //B5: Response thông tin đăng nhập
        account.password = undefined
        return res.status(200).json({
            message: "Đăng nhập thành công!",
            account,
            accsessToken
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}