import { getProductService } from "../services/productService.js";

export const getProduct = async (req, res) => {
  try {
    const {
      page,
      limit,
      category,
      promotion,
      minPrice,
      maxPrice,
      minViews,
      minRating,
    } = req.query;

    const filters = {
      category,
      promotion: promotion === "true", // vì query string gửi lên là string
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minViews: minViews ? Number(minViews) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
    };

    const data = await getProductService(page, limit, filters);

    if (!data) {
      return res.status(500).json({
        EC: -1,
        EM: "Lỗi server khi lấy danh sách sản phẩm",
      });
    }

    return res.status(200).json({
      EC: 0,
      EM: "Lấy danh sách sản phẩm thành công",
      DT: data,
    });
  } catch (error) {
    console.error("Error in getProduct controller:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi server khi lấy danh sách sản phẩm",
    });
  }
};
