import React, { useState } from "react";
import { InputText } from "./InputText";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Card } from "./Card";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  initialProducts?: Product[];
}

export const Cart: React.FC<CartProps> = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  const addProduct = () => {
    const id = products.length + 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({ name: "", price: 0, quantity: 1 });
  };

  const updateProduct = () => {
    if (editProduct) {
      setProducts(
        products.map((p) => (p.id === editProduct.id ? editProduct : p))
      );
      setEditProduct(null);
      setModalOpen(false);
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const openEditModal = (product: Product) => {
    setEditProduct({ ...product });
    setModalOpen(true);
  };

  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div>
      <h1>Giỏ Hàng</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((p) => (
          <Card
            key={p.id}
            title={p.name}
            content={`Giá: ${p.price} VND - SL: ${p.quantity}`}
          >
            <Button onClick={() => openEditModal(p)} label="Sửa" />
            <Button
              onClick={() => deleteProduct(p.id)}
              label="Xóa"
              variant="secondary"
            />
          </Card>
        ))}
      </div>
      <p>Tổng tiền: {total} VND</p>

      {/* Form thêm sản phẩm */}
      <h2>Thêm sản phẩm mới</h2>
      <InputText
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Tên sản phẩm"
      />
      <InputText
        type="number"
        value={newProduct.price.toString()}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
        }
        placeholder="Giá"
      />
      <InputText
        type="number"
        value={newProduct.quantity.toString()}
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
        }
        placeholder="Số lượng"
      />
      <Button onClick={addProduct} label="Thêm" />

      {/* Modal sửa sản phẩm */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Sửa sản phẩm"
      >
        {editProduct && (
          <>
            <InputText
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
              placeholder="Tên"
            />
            <InputText
              type="number"
              value={editProduct.price.toString()}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: parseFloat(e.target.value),
                })
              }
              placeholder="Giá"
            />
            <InputText
              type="number"
              value={editProduct.quantity.toString()}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  quantity: parseInt(e.target.value),
                })
              }
              placeholder="Số lượng"
            />
            <Button onClick={updateProduct} label="Cập nhật" />
          </>
        )}
      </Modal>
    </div>
  );
};
