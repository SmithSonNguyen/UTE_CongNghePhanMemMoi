import "dotenv/config";
import { Product } from "../models/product.js";

export const getProductService = async (page = 1, limit = 10, filters = {}) => {
  try {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Xây dựng query filter
    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.promotion !== undefined) {
      query.promotion = filters.promotion;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }

    if (filters.minViews !== undefined) {
      query.views = { $gte: filters.minViews };
    }

    if (filters.minRating !== undefined) {
      query.rating = { $gte: filters.minRating };
    }

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
