import React, { useState, useEffect } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";

function ProductView({ products }) {
  const sidePanel = localStorage.getItem("sideOpen") === "false" ? false : true;
  const [sideOpen, setSideOpen] = useState(sidePanel);
  const [selectedProduct, setSelectedProduct] = useState();

  // Open side panel when product is selected
  useEffect(() => {
    console.log(`selectedProduct CHANGED to: `, selectedProduct);

    if (selectedProduct) setSideOpen(true);
  }, [selectedProduct]);

  // Deselect product when side panel is closed
  useEffect(() => {
    console.log(`sideOpen CHANGED to: `, sideOpen);
    if (!sideOpen) setSelectedProduct();
  }, [sideOpen]);

  // Restore Side Panel on Refresh
  useEffect(() => {
    localStorage.setItem("sideOpen", sideOpen);
    if (!sideOpen) setSelectedProduct();
  }, [sideOpen]);

  console.log("Return statement in ProductView.js has been triggered");
  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={
                !selectedProduct ? false : item.id === selectedProduct.id
              }
              onClick={() => setSelectedProduct(item)}
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
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;
