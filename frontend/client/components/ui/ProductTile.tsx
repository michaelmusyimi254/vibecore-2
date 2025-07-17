import React from "react";

export function ProductTile({ product, onAddToCart }: { product: any; onAddToCart?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ borderRadius: "0.75rem", width: "100%", objectFit: "cover", height: 180 }}
      />
      <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{product.name}</div>
      <div style={{ fontSize: "0.875rem", color: "#444" }}>{product.price}</div>
      <button
        style={{
          backgroundColor: "#2196F3",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: 600,
        }}
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
} 