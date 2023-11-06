import Category from "../models/Category";
import product from "../models/Product";
import productSchema from "../validations/products";
// CREATE PRODUCT
export const createPro = async (req, res) => {
    try {
        // Validation product
        const body = req.body;
        const { error } = productSchema.validate(body);
        if (error) {
            return res.status(500).json({
                message: error.details[0].message,
            })
        }
        // Create product
        const data = await product.create(body)
        if (!data) {
            return res.status(404).json({
                message: "Tạo mới sản phẩm thất bại!",
            });
        }
        // Up product in Category
        const productCate = await Category.findByIdAndUpdate(data.categoryId, {
            $addToSet: {
                product: data.id
            }
        })
        if (!productCate) {
            return res.status(404).json({
                message: "Sản phẩm chưa được đưa vào danh mục!",
            });
        }

        return res.status(200).json({
            message: "Tạo mới sản phẩm thành công!",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Tạo sản phẩm thất bại ",
        })
    }
}

//LIST PRODUCT
export const listPro = async (req, res) => {
    try {
        // console.log("req.query", req.query);
        // const _limit = req.query._limit || 10;
        // const _page = req.query._page || 1;
        // const _sort = req.query._sort || "createAt";
        // const _order = req.query._order || "asc";
        // const options = {
        //     limit: _limit,
        //     page: _page,
        //     sort: {
        //         [sort]: _order === "asc" ? 1 : -1,
        //     }
        // }
        const body = req.body;
        const list = await product.find(body).populate("categoryId");
        // const list = await product.paginate({}, options);

        if (!list) {
            //|| list.docs.length === 0
            return res.status(400).json({
                message: "Hiển thị danh sách sản phẩm thất bại!",
            })
        }
        return res.status(200).json({
            message: "Hiển thị danh sách sản phẩm thành công",
            data: list,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Hiển thị danh sách sản phẩm thất bại!",
        })
    }
}
// DETAIL PRODUCT
export const detailPro = async (req, res) => {
    try {
        const body = req.params.id;
        const detail = await product.findById(body).populate("categoryId")
        if (!detail) {
            return res.status(400).json({
                message: "Hiển thị sản phẩm thất bại",
            })
        }
        return res.status(200).json({
            message: "Sản phẩm cần tìm",
            data: detail
        })

    } catch (error) {
        return res.status(500).json({
            message: "Hiển thị sản phẩm thất bại!",
        })
    }
}
// UPDATE PRODUCT
export const updatePro = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id;
        const { error } = productSchema.validate(body);
        if (error) {
            return res.status(404).json({
                message: error.details[0].message,
            })
        }
        const update = await product.findByIdAndUpdate(id, body, { new: true }).populate("categoryId");
        if (!update) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại!",
            })
        }
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công!",
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            message: "Cập nhật sản phẩm thất bại!",
        })
    }
}
// DELETE PRODUCT
export const deletePro = async (req, res) => {
    try {
        const body = req.params.id;
        const deletePro = await product.findByIdAndDelete(body)
        if (!deletePro) {
            return res.status(400).json({
                message: "Xóa sản phẩm thất bại!",
            })
        }
        return res.status(200).json({
            message: "Xóa sản phẩm thành công!"

        })
    } catch (error) {
        return res.status(500).json({
            message: "Xóa sản phẩm thất bại!",
        })
    }
}