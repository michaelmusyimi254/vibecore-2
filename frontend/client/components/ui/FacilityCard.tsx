import React from "react";

export function FacilityCard({ facility, onBook }: { facility: any; onBook?: () => void }) {
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
        src={facility.images?.[0] || facility.image}
        alt={facility.name}
        style={{ borderRadius: "0.75rem", width: "100%", objectFit: "cover", height: 180 }}
      />
      <div style={{ fontWeight: 600 }}>{facility.name}</div>
      <div style={{ fontSize: "0.875rem", color: "#777" }}>{facility.location}</div>
      <button
        style={{
          backgroundColor: "#D91E36",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: 600,
        }}
        onClick={onBook}
      >
        Book Facility
      </button>
    </div>
  );
} 