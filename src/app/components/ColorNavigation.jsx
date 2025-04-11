"use client";
import { useState } from "react";
import { Moon, Sun, Shuffle, Copy } from "lucide-react";
export default function ColorNavigation() {
  const [darkMode, setDarkMode] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [accentColor, setAccentColor] = useState("#000000");

  const generateRandomMultipleColors = () => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      colors.push(randomColor);
    }
    setTextColor(colors[0]);
    setBackgroundColor(colors[1]);
    setPrimaryColor(colors[2]);
    setSecondaryColor(colors[3]);
    setAccentColor(colors[4]);
  };

  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    const textWithoutHash = textColor.replace("#", "");
    const backgroundWithoutHash = backgroundColor.replace("#", "");
    const primaryWithoutHash = primaryColor.replace("#", "");
    const secondaryWithoutHash = secondaryColor.replace("#", "");
    const accentWithoutHash = accentColor.replace("#", "");

    navigator.clipboard.writeText(
      `text:"0x${textWithoutHash}\nbackground: "0x${backgroundWithoutHash}"\nprimary: "0x${primaryWithoutHash}"\nsecondary: "0x${secondaryWithoutHash}"\naccent: "0x${accentWithoutHash}"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles = {
    colorSelector: {
      backgroundColor: darkMode ? "#0D004D" : "#FFFFFF",
    },
  };

  return (
    <div className="colorNav bottom-4 fixed left-1/2 -translate-x-1/2">
      <div
        className="colorSelector flex gap-2 items-center"
        style={styles.colorSelector}
      >
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
          className="selectColor cursor-pointer colorSwatch"
        />
        <div
          className="randomColorButton"
          onClick={generateRandomMultipleColors}
        >
          <Shuffle size={20} className="randomColorIcon" />
        </div>
        <div className="darkModeButton" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Moon size={20} className="darkModeIcon" />
          ) : (
            <Sun size={20} className="darkModeIcon" />
          )}
        </div>
        {/* USE http://colormind.io/api-access/ FOR GENERATING COLOR THEMES */}
        <div className="copyColorButton" onClick={copyToClipboard}>
          <Copy size={20} className="copyColorIcon" />
          {copied && <div className="copyNotification">Copied!</div>}
        </div>
      </div>
    </div>
  );
}
