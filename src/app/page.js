"use client";

import ColorNavigation from "./components/ColorNavigation";
import ColorSelectorIllustration from "./components/ColorSelectorIllustration";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [textColor, setTextColor] = useState("#1e1e2e");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [primaryColor, setPrimaryColor] = useState("#5314FF");
  const [secondaryColor, setSecondaryColor] = useState("#FF6633");
  const [accentColor, setAccentColor] = useState("#33FF66");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [svgContent, setSvgContent] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      setSvgContent(event.target.result);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    document.documentElement.classList.add("transition-colors", "duration-300");
    document.body.classList.add("transition-colors", "duration-300");
    document.documentElement.style.color = textColor;
    document.documentElement.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
    document.body.style.backgroundColor = backgroundColor;
  }, [darkMode, textColor, backgroundColor]);

  const styles = {
    page: {
      color: textColor,
      backgroundColor: backgroundColor,
      transitionProperty: "background-color, border-color, color, fill, stroke",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
    },
    MainPage: {},
    Header: {
      color: textColor,
      backgroundColor: backgroundColor,
    },
  };

  // i did not use what's above, i realized that i just needed to change the entire html file itself.

  return (
    <div className="page flex-col items-center justify-center">
      <Header style={styles.Header} />
      <div className="MainPage mx-12 pt-17 flex justify-center items-center flex-col">
        <div className="p1 flex justify-center items-center min-h-full">
          <div className="p1-texts flex flex-col gap-3">
            <div
              className="p1-title flex justify-center items-center text-7xl font-bold 
            "
            >
              Pallette Visualizer
            </div>
            <div className="p1-description text-md font-medium flex justify-center items-center ">
              Play with pigments to match your creative energy. Export colors as
              HEX, RGB, or CSS. Import images or SVGs to edit hues live.
            </div>
          </div>
          <ColorSelectorIllustration
            primaryColor={primaryColor}
            className="flex-shrink-0 h-auto"
          />
        </div>
        <div className="p2">
          <div
            className="insert-svg cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            Insert svg
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="p2">sds</div>
        <div className="p2">sds</div>
        <div className="p2">sds</div>
        <div className="p2">sds</div>
        <div className="p2">sds</div>
        <div className="p2">sds</div>
        <div className="p2">sds</div>
      </div>
      <ColorNavigation
        textColor={textColor}
        backgroundColor={backgroundColor}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        accentColor={accentColor}
        setTextColor={setTextColor}
        setBackgroundColor={setBackgroundColor}
        setPrimaryColor={setPrimaryColor}
        setSecondaryColor={setSecondaryColor}
        setAccentColor={setAccentColor}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}
