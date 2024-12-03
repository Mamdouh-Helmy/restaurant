import { useState } from "react";
import { icons } from "../../utils/icons.util";
export default function FaceIcons({ Rating }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const rating = sessionStorage.getItem("rating");

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index) => {
    setSelected(index);
    Rating(index);
    sessionStorage.setItem('rating', index)
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icons.map((iteam, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
          className="text-[1.2rem]"
          style={{
            cursor: "pointer",
            margin: "0 15px",
            transition: "0.3s",
            color: index + 1 <= (hovered || selected || rating) ? "#feb913" : "gray",
            transform:
              hovered === index + 1 || selected === index + 1 || rating == index + 1
                ? "scale(1.2)"
                : "scale(1)",
          }}
        >
          {iteam}
        </div>
      ))}
      {/* <p style={{ marginLeft: "20px" }}>Rating: {selected}</p> */}
    </div>
  );
}
