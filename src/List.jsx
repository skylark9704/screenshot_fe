import React from "react";

function ListDemo() {
  return (
    <>
      <ul style={{ height: "350px", overflowY: "scroll" }}>
        {Array(50)
          .fill(0)
          .map((_, index) => (
            <li>{index + 1}</li>
          ))}
      </ul>
    </>
  );
}

export default ListDemo;
