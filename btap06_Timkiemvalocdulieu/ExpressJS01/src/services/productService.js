import "dotenv/config";
import { Product } from "../models/product.js";

export const getProductService = async (page = 1, limit = 10, filters = {}) => {
  try {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Xây dựng query filter bằng $and
    const andConditions = [];

    if (filters.category) {
      andConditions.push({ category: filters.category });
    }

    if (filters.promotion !== undefined) {
      andConditions.push({ promotion: filters.promotion });
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const priceFilter = {};
      if (filters.minPrice !== undefined) priceFilter.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) priceFilter.$lte = filters.maxPrice;
      andConditions.push({ price: priceFilter });
    }

    if (filters.minViews !== undefined) {
      andConditions.push({ views: { $gte: filters.minViews } });
    }

    if (filters.minRating !== undefined) {
      andConditions.push({ rating: { $gte: filters.minRating } });
    }

    // ✅ Thêm fuzzy search (theo tên hoặc mô tả)
    if (filters.search) {
      andConditions.push({
        $or: [
          { name: { $regex: filters.search, $options: "i" } },
          { description: { $regex: filters.search, $options: "i" } },
        ],
      });
    }

    // Nếu không có filter nào thì query = {}
    const query = andConditions.length > 0 ? { $and: andConditions } : {};

    // Tổng số sản phẩm
    const totalProducts = await Product.countDocuments(query);

    // Lấy danh sách sản phẩm
    const products = await Product.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalProducts / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    return {
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        limit: limitNum,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? pageNum + 1 : null,
        prevPage: hasPrevPage ? pageNum - 1 : null,
      },
    };
  } catch (error) {
    console.error("getProductService error:", error);
    return null;
  }
};
