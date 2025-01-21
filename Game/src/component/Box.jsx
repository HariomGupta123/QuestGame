import React from "react";

const Box = ({ content, isSelected, isActive, onSelect,selectedBox ,bobs}) => {
  return (
    <div
      style={{
        width: "120px",
        height: "30px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "5px",
        borderRadius: "5px",
        cursor: isActive ? "pointer" : "not-allowed", // Disable cursor for inactive floors
        backgroundColor: isSelected 
          ? "#12D812FF"
          : isActive
          ? "#00FF00"
          : "gray", // Apply yellow background if selected
        opacity: isActive ? 1 : 0.5, // Reduce opacity for inactive floors
      }}
      onClick={isActive ? onSelect : null} // Only allow clicks for active floors
    >
      {bobs
        ? content === "gem"
          ? "🍎"
          : content === "bomb"
          ? "💣"
          : "?"
        : selectedBox
        ? content === "gem"
          ? "🍎"
          : content === "bomb"
          ? "💣"
          : "?"
        : content === "gem"
        ? "🍎"
        : "🍎"}
    </div>
  );
};

export default Box;
