import React from "react";

export function EventCard({ event, onBook }: { event: any; onBook?: () => void }) {
  // Calculate progress percentage for the progress bar
  const progress = Math.min(100, Math.max(0, ((event.capacity - event.spotsLeft) / event.capacity) * 100));
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      {/* Image with Badge */}
      <div style={{ position: "relative" }}>
        <img
          src={event.image}
          alt={event.title}
          style={{
            borderRadius: "0.75rem",
            width: "100%",
            height: "160px",
            objectFit: "cover",
          }}
        />
        {event.isPopular && (
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              backgroundColor: "#D91E36",
              color: "white",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            Popular
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            backgroundColor: "white",
            color: "#D91E36",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <span>⭐</span> {event.rating}
        </div>
      </div>

      {/* Event Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{event.title}</h3>
          <span style={{ color: "#D91E36", fontSize: "0.875rem", fontWeight: 600 }}>
            {event.price === 0 ? "Free" : `$${event.price}`}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6B7280" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "0.875rem" }}>{event.time}</span>
          
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "0.875rem" }}>{event.location}</span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
          {event.tags?.map((tag: string, index: number) => (
            <span
              key={index}
              style={{
                backgroundColor: "#F3F4F6",
                color: "#4B5563",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>RSVP</span>
            <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{event.capacity - event.spotsLeft}/{event.capacity}</span>
          </div>
          <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "4px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#D91E36",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>
            {event.spotsLeft} spots left
          </div>
        </div>

        {/* Organizer */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden" }}>
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>By {event.organizer.name}</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
          <button
            style={{
              flex: 1,
              backgroundColor: "#D91E36",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              fontWeight: 600,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
            onClick={onBook}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21L12 18L19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Book Now
          </button>
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "0.5rem",
              border: "1px solid #E5E7EB",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}