import React, { useState } from "react";

function ProductList() {
  const products = [
    { name: "Pen", price: 10, category: "Stationery" },
    { name: "Notebook", price: 50, category: "Stationery" },
    { name: "Laptop Bag", price: 800, category: "Bags" },
    { name: "Headphones", price: 1200, category: "Electronics" },
    { name: "Mouse", price: 500, category: "Electronics" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Stationery", "Bags", "Electronics"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Product List</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ marginBottom: "15px", padding: "5px" }}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> – ₹{product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
