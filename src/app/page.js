"use client";

import ColorNavigation from "./components/ColorNavigation";
import ColorSelectorIllustration from "./components/ColorSelectorIllustration";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import { Download, Upload, ArrowRight, Paintbrush, Brush } from "lucide-react";
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
  const [colors, setColors] = useState([]);
  const [previewSvg, setPreviewSvg] = useState("");
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
    if (!svgContent) {
      fetch("/Illustration.svg")
        .then((res) => res.text())
        .then((text) => setSvgContent(text))
        .catch((err) => console.error("SVG load failed:", err));
    }
  }, []);

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

  useEffect(() => {
    if (!svgContent) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");

    const coloredElements = [];
    const allElements = svgDoc.querySelectorAll("*");

    allElements.forEach((el) => {
      const fill = el.getAttribute("fill");
      const stroke = el.getAttribute("stroke");

      if (fill && fill !== "none" && !fill.startsWith("url(")) {
        if (
          !coloredElements.some(
            (item) => item.color === fill && item.type === "fill"
          )
        ) {
          coloredElements.push({ element: el, color: fill, type: "fill" });
        }
      }

      if (stroke && stroke !== "none" && !stroke.startsWith("url(")) {
        if (
          !coloredElements.some(
            (item) => item.color === stroke && item.type === "stroke"
          )
        ) {
          coloredElements.push({ element: el, color: stroke, type: "stroke" });
        }
      }

      const style = el.getAttribute("style");
      if (style) {
        const fillMatch = style.match(/fill:\s*([^;]+)/);
        if (
          fillMatch &&
          fillMatch[1] !== "none" &&
          !fillMatch[1].startsWith("url(")
        ) {
          if (
            !coloredElements.some(
              (item) => item.color === fillMatch[1] && item.type === "fill"
            )
          ) {
            coloredElements.push({
              element: el,
              color: fillMatch[1],
              type: "fill",
            });
          }
        }

        const strokeMatch = style.match(/stroke:\s*([^;]+)/);
        if (
          strokeMatch &&
          strokeMatch[1] !== "none" &&
          !strokeMatch[1].startsWith("url(")
        ) {
          if (
            !coloredElements.some(
              (item) => item.color === strokeMatch[1] && item.type === "stroke"
            )
          ) {
            coloredElements.push({
              element: el,
              color: strokeMatch[1],
              type: "stroke",
            });
          }
        }
      }
    });

    const uniqueColors = [];
    coloredElements.forEach((item) => {
      const exists = uniqueColors.find(
        (c) => c.originalColor === item.color && c.type === item.type
      );
      if (!exists) {
        uniqueColors.push({
          originalColor: item.color,
          newColor: item.color,
          type: item.type,
        });
      }
    });

    setColors(uniqueColors);
    setPreviewSvg(svgContent);
  }, [svgContent]);

  useEffect(() => {
    if (!svgContent || colors.length === 0) return;

    let updatedSvg = svgContent;

    colors.forEach((colorObj) => {
      if (colorObj.originalColor === colorObj.newColor) return;

      const { originalColor, newColor, type } = colorObj;

      const attrRegex = new RegExp(
        `${type}=["']${escapeRegExp(originalColor)}["']`,
        "g"
      );
      updatedSvg = updatedSvg.replace(attrRegex, `${type}="${newColor}"`);

      const styleRegex = new RegExp(
        `${type}:\\s*${escapeRegExp(originalColor)}`,
        "g"
      );
      updatedSvg = updatedSvg.replace(styleRegex, `${type}: ${newColor}`);
    });

    setPreviewSvg(updatedSvg);
  }, [colors, svgContent]);

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function handleColorChange(index, newColor) {
    const updatedColors = [...colors];
    updatedColors[index].newColor = newColor;
    setColors(updatedColors);
  }

  function exportSvg() {
    const blob = new Blob([previewSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName ? `modified_${fileName}` : "modified.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page flex-col items-center justify-center">
      <Header style={styles.Header} />
      <div className="MainPage pt-15 flex justify-center items-center flex-col">
        <div className="p1 w-[100%] px-[7rem] flex justify-center items-center min-h-full">
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
        <div className="p2 min-h-[94vh] flex px-12 w-[100%] pt-[5rem] bg-gray-100">
          <div className="flex flex-col w-[100%] gap-[1.5rem]">
            <div
              className="p1-title flex items-center justify-center text-4xl font-bold 
            "
            >
              SVG Color Editor
            </div>
            <div className="flex justify-center gap-[3rem] text-md ">
              <div className="flex flex-col gap-[2rem]">
                <div className="flex flex-col gap-[.4rem]">
                  <h2 className="flex items-center text-[1.1rem]">
                    <Upload size={23} className="mr-2" />
                    Upload svg
                  </h2>
                  <div className="flex gap-[.5rem] items-center text-[.85rem]">
                    <div
                      className="insert-svg cursor-pointer bg-[#1E1E2E] w-[7rem] py-1 rounded-xl text-white flex justify-center items-center"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Insert Here
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".svg"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <span className="text-gray-400 ">{fileName}</span>
                  </div>
                </div>
                <div className="">
                  <h2 className="flex text-[1.2rem] items-center">
                    <Brush size={20} className="mr-2" />
                    <span>Colors</span>
                  </h2>
                  {colors.length === 0 ? null : (
                    <div className="grid grid-cols-5 gap-2 bg-gray-50 rounded-2xl p-2">
                      {colors.map((colorObj, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center p-2"
                        >
                          <input
                            type="color"
                            value={colorObj.newColor}
                            onChange={(e) =>
                              handleColorChange(index, e.target.value)
                            }
                            className="w-6 h-6 rounded-full cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[.5rem]">
                  <h2 className="flex items-center text-[1.2rem] ">
                    <Download size={20} className="mr-2" />
                    Export
                  </h2>
                  <div
                    onClick={exportSvg}
                    className="bg-[#1E1E2E] w-[12rem] text-white text-[.87rem] flex justify-center rounded-[20px] py-[.3rem] cursor-pointer"
                  >
                    Download modified svg
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded p-4 bg-gray-50 flex items-center justify-center h-[500px] w-[600px] overflow-hidden">
                <div dangerouslySetInnerHTML={{ __html: previewSvg }} />
              </div>
            </div>
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
