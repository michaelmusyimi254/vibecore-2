import React from "react";

export function TrainerCard({ trainer, onBook }: { trainer: any; onBook?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={trainer.avatar}
        alt={trainer.name}
        style={{ borderRadius: "50%", width: 64, height: 64, objectFit: "cover" }}
      />
      <div style={{ fontWeight: 700 }}>{trainer.name}</div>
      {trainer.rating && (
        <div style={{ color: "#D91E36", fontWeight: 600 }}>{trainer.rating} ★</div>
      )}
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
        Book
      </button>
    </div>
  );
} 