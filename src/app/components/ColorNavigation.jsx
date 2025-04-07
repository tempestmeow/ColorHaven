"use client";
import { useState } from "react";

export default function ColorNavigation() {
  const [color, setColor] = useState("#000000");
  return (
    <div className="colorNav">
      <div
        className="rectange-tester r1 w-64 h-64 rounded-2xl"
        style={{ backgroundColor: color }}
      ></div>
      <div className="colorSelector ">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
      </div>
    </div>
  );
}
