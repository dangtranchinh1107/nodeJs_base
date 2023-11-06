import Category from "../models/Category"
import categorySchema from "../validations/category";

export const createCate = async (req, res) => {
    try {
        const body = req.body
        const { error } = categorySchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.create(body);
        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "Tạo danh mục thất bại!"
            })
        }
        return res.status(200).json({
            message: "Tạo danh mục thành công:",
            data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: "Tạo danh mục thất bại!"
        })
    }
}

export const listCate = async (req, res) => {
    try {
        const body = req.body
        const data = await Category.find(body)
        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "Hiển thị danh mục thất bại!"
            })
        }
        return res.status(200).json({
            message: "Danh sách danh mục:",
            data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: "Hiển thị danh mục thất bại!"
        })
    }
}

export const detailCate = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Category.findById(id).populate("products")
        if (!data) {
            return res.status(400).json({
                message: "Không tìm thấy danh mục"
            })
        }
        return res.status(200).json({
            message: "Danh mục cần tìm:",
            data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: "Không tìm thấy danh mục"
        })
    }
}

export const updateCate = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const { error } = categorySchema.validate(body, { abortEarly: false });
        console.log(error);
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.findByIdAndUpdate(id, body, { new: true });
        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "Cập nhật danh mục thất bại!"
            })
        }
        return res.status(200).json({
            message: "Cập nhật danh mục thành công:",
            data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: "Cập nhật danh mục thất bại!"
        })
    }
}


export const deleteCate = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Category.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({
                message: "Xóa danh mục thất bại!"
            })
        }
        return res.status(200).json({
            message: "Xóa danh mục thành công:",
            data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: "Xóa danh mục thất bại!"
        })
    }
}