import { Cart } from "cart-library";
import "./App.css";

function App() {
  return (
    <div>
      <Cart
        initialProducts={[
          { id: 1, name: "Sản phẩm 1", price: 100, quantity: 1 },
        ]}
      />
      <Cart
        initialProducts={[
          { id: 2, name: "Sản phẩm 2", price: 200, quantity: 2 },
        ]}
      />
      <Cart
        initialProducts={[
          { id: 3, name: "Sản phẩm 3", price: 300, quantity: 3 },
        ]}
      />
    </div>
  );
}

export default App;
