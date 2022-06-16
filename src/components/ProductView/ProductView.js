import React from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";
import { useState, useEffect } from "react";

function ProductView({ products }) {
  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setSideOpen(true);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (!sideOpen) {
      setSelectedProduct();
    }
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={selectedProduct && item.id === selectedProduct.id}
              onClick={(e) => setSelectedProduct(item)}
            />
          ))}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div
            className="product-side-panel-toggle"
            onClick={() => setSideOpen(!sideOpen)}
          >
            {sideOpen ? ">" : "<"}
          </div>
        </div>

        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
