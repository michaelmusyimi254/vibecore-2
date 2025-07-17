import React from "react";

export function EventCard({ event, onBook }: { event: any; onBook?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src={event.image}
        alt={event.title}
        style={{ borderRadius: "0.75rem", width: "100%", objectFit: "cover", height: 180 }}
      />
      <div style={{ fontSize: "1rem", fontWeight: 600 }}>{event.title}</div>
      <div style={{ fontSize: "0.875rem", color: "#888" }}>{event.date}</div>
      <button
        style={{
          backgroundColor: "#D91E36",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: 600,
          marginTop: 8,
        }}
        onClick={onBook}
      >
        Book
      </button>
    </div>
  );
} 