import { useState, useEffect } from "react";
import {
  Spin,
  Button,
  Space,
  Typography,
  notification,
  Select,
  Slider,
  Rate,
  Checkbox,
} from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import { getProductApi } from "../util/api"; // bạn cần viết hàm gọi API

const { Title, Text } = Typography;
const { Option } = Select;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Bộ lọc
  const [category, setCategory] = useState(null);
  const [promotion, setPromotion] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 60000000]);
  const [minViews, setMinViews] = useState(0);
  const [minRating, setMinRating] = useState(0);

  const pageSize = 5;

  const fetchProducts = async (page = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const filters = {
        category,
        promotion,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minViews,
        minRating,
      };

      const res = await getProductApi(page, pageSize, filters);

      if (res?.EC === 0) {
        if (append) {
          setProducts((prev) => [...prev, ...res.DT.products]);
        } else {
          setProducts(res.DT.products);
        }
        setPagination(res.DT.pagination);
      } else {
        notification.error({
          message: "Lỗi",
          description: res?.EM || "Không thể tải danh sách sản phẩm",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi tải dữ liệu",
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, false);
  }, [category, promotion, priceRange, minViews, minRating]);

  useEffect(() => {
    if (products.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
      products.forEach((product, index) => {
        setTimeout(() => {
          setVisibleProducts((prev) => {
            if (!prev.find((p) => p._id === product._id)) {
              return [...prev, { ...product, isVisible: true }];
            }
            return prev;
          });
        }, index * 200);
      });
    } else {
      setVisibleProducts(products.map((p) => ({ ...p, isVisible: true })));
    }
  }, [products, isInitialLoad]);

  const loadMore = () => {
    if (pagination.hasNextPage && !loadingMore) {
      fetchProducts(pagination.nextPage, true);
    }
  };

  const refresh = () => {
    setProducts([]);
    setVisibleProducts([]);
    setIsInitialLoad(true);
    fetchProducts(1, false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Danh sách Sản phẩm
          </Title>
          <Text type="secondary">
            {pagination.totalProducts
              ? `Hiển thị ${visibleProducts.length} / ${pagination.totalProducts} sản phẩm`
              : `Đang tải...`}
          </Text>
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={refresh} loading={loading}>
            Refresh
          </Button>
        </Space>
      </div>

      {/* Bộ lọc */}
      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          border: "1px solid #eee",
          borderRadius: 8,
          background: "#fafafa",
        }}
      >
        <Space wrap>
          <Select
            placeholder="Chọn danh mục"
            style={{ width: 180 }}
            allowClear
            onChange={(val) => setCategory(val)}
          >
            <Option value="Laptop">Laptop</Option>
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="Tai nghe">Tai nghe</Option>
            <Option value="Đồng hồ">Đồng hồ</Option>
            <Option value="Máy ảnh">Máy ảnh</Option>
          </Select>

          <Checkbox
            checked={promotion}
            onChange={(e) => setPromotion(e.target.checked)}
          >
            Có khuyến mãi
          </Checkbox>

          <div style={{ width: 200 }}>
            <Text>Giá (₫)</Text>
            <Slider
              range
              min={0}
              max={60000000}
              step={1000000}
              defaultValue={priceRange}
              onAfterChange={(val) => setPriceRange(val)}
            />
          </div>

          <div style={{ width: 200 }}>
            <Text>Lượt xem tối thiểu</Text>
            <Slider
              min={0}
              max={2000}
              step={50}
              defaultValue={minViews}
              onAfterChange={(val) => setMinViews(val)}
            />
          </div>

          <div>
            <Text>Đánh giá tối thiểu</Text>
            <Rate onChange={(val) => setMinRating(val)} />
          </div>
        </Space>
      </div>

      {/* Loading */}
      {loading && products.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
          <div style={{ marginTop: "16px" }}>
            <Text>Đang tải danh sách sản phẩm...</Text>
          </div>
        </div>
      )}

      {/* Products list */}
      <div style={{ marginBottom: "24px" }}>
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            index={index}
            isVisible={product.isVisible}
          />
        ))}
      </div>

      {/* Load more */}
      {pagination.hasNextPage && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={loadMore}
            loading={loadingMore}
            style={{ minWidth: "200px" }}
          >
            {loadingMore ? "Đang tải thêm..." : "Tải thêm sản phẩm"}
          </Button>
        </div>
      )}

      {/* End of list */}
      {!pagination.hasNextPage && products.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#999",
            borderTop: "1px solid #f0f0f0",
            marginTop: "20px",
          }}
        >
          <Text type="secondary">🎉 Đã tải hết tất cả sản phẩm!</Text>
        </div>
      )}
    </div>
  );
};

export default ProductList;
