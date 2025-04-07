"use client";
import { useState } from "react";
import { Moon, Sun, Shuffle, Copy } from "lucide-react";
export default function ColorNavigation() {
  const [darkMode, setDarkMode] = useState(false);
  const [color, setColor] = useState("#000000");
  const [copied, setCopied] = useState(false);
  const generateRandomColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setColor(randomColor);
  };

  const copyToClipboard = () => {
    const hexWithoutHash = color.replace("#", "");
    navigator.clipboard.writeText(`primary:"0x${hexWithoutHash}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="colorNav">
      <div
        className="rectange-tester r1 w-64 h-64 rounded-2xl"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="colorSelector flex"
        style={{ backgroundColor: darkMode ? "#0D004D" : "#FFFFFF" }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
        <div className="hexDisplay">{color.toUpperCase()}</div>
        <div ckassName="randomColorButton" onClick={generateRandomColor}>
          <Shuffle size={20} className="randomColorIcon" />
        </div>
        <div className="darkModeButton" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Moon size={20} className="darkModeIcon" />
          ) : (
            <Sun size={20} className="darkModeIcon" />
          )}
        </div>

        <div className="copyColorButton" onClick={copyToClipboard}>
          <Copy size={20} className="copyColorIcon" />
          {copied && <div className="copyNotification">Copied!</div>}
        </div>
      </div>
    </div>
  );
}
