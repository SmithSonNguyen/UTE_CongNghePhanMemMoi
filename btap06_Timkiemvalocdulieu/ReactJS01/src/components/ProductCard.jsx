import { Card, Typography, Tag, Rate, Space } from "antd";
import {
  ShoppingOutlined,
  EyeOutlined,
  DollarOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ProductCard = ({ product, index, isVisible }) => {
  return (
    <Card
      hoverable
      style={{
        marginBottom: 16,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease-in-out",
        transitionDelay: `${index * 0.1}s`,
      }}
      bodyStyle={{ padding: "16px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Icon placeholder */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: "#1890ff",
          }}
        >
          <ShoppingOutlined />
        </div>

        {/* Product info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              {product.name}
            </Title>
            {product.promotion && <Tag color="red">Sale</Tag>}
          </div>

          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarOutlined style={{ color: "#666" }} />
              <Text strong style={{ color: "#1890ff" }}>
                {product.price.toLocaleString()} ₫
              </Text>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <EyeOutlined style={{ color: "#666" }} />
              <Text type="secondary">{product.views} lượt xem</Text>
            </div>

            <Rate disabled allowHalf defaultValue={product.rating || 0} />

            <Text type="secondary" style={{ fontSize: "12px" }}>
              Danh mục: {product.category}
            </Text>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
