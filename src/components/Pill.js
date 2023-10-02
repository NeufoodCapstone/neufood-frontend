import React from "react";

const Pill = ({ title }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        backgroundColor: "white",
        color: "black",
        padding: "7px 14px",
        fontSize: "16px",
        cursor: "pointer",
        color: "black",
        borderRadius: "40px",
        marginBottom: "15px",
      }}
    >
      {title}
    </div>
  );
};

export default Pill;
