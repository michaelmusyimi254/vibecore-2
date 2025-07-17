import React from "react";

export function ShopScroller({ shops }: { shops: any[] }) {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {shops.map((shop, idx) => (
        <div
          key={shop.id || idx}
          style={{
            minWidth: 140,
            padding: "0.5rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "0.75rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img
            src={shop.logo || shop.image}
            alt={shop.shop_name || shop.name}
            style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ fontSize: "0.875rem" }}>{shop.shop_name || shop.name}</div>
          {shop.rating && (
            <div style={{ color: "#D91E36", fontWeight: 600 }}>{shop.rating} ★</div>
          )}
        </div>
      ))}
    </div>
  );
} 