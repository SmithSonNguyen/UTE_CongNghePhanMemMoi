import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // tên sản phẩm
    category: { type: String, required: true, index: true }, // danh mục để filter nhanh
    price: { type: Number, required: true, min: 0 }, // giá >= 0
    promotion: { type: Boolean, default: false }, // có khuyến mãi hay không
    views: { type: Number, default: 0, min: 0 }, // số lượt xem
    description: { type: String, trim: true }, // mô tả sản phẩm
    stock: { type: Number, default: 0, min: 0 }, // số lượng tồn kho
    rating: { type: Number, default: 0, min: 0, max: 5 }, // đánh giá trung bình (0-5 sao)
  },
  {
    timestamps: true, // tự động thêm createdAt, updatedAt
  }
);

export const Product = mongoose.model("Product", productSchema);
