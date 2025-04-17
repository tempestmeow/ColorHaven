"use client";
import { useState, useRef, useEffect } from "react";
import { Moon, Sun, Shuffle, Copy, SlidersHorizontal } from "lucide-react";

export default function ColorNavigation({
  textColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  setTextColor,
  setBackgroundColor,
  setPrimaryColor,
  setSecondaryColor,
  setAccentColor,
  darkMode,
  setDarkMode,
}) {
  const [showColorEditor, setShowColorEditor] = useState(false);
  const [hueAdjustment, setHueAdjustment] = useState(0);
  const [saturationAdjustment, setSaturationAdjustment] = useState(0);
  const [brightnessAdjustment, setBrightnessAdjustment] = useState(0);
  const [temperatureAdjustment, setTemperatureAdjustment] = useState(0);

  const [originalColors, setOriginalColors] = useState({
    text: "#1e1e2e",
    background: "#FFFFFF",
    primary: "#5314ff",
    secondary: "#FF6633",
    accent: "#33FF66",
  });

  const [copied, setCopied] = useState(false);
  const colorEditorRef = useRef(null);

  useEffect(() => {
    setOriginalColors({
      text: textColor,
      background: backgroundColor,
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
    });
  }, []);

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

    setPrimaryColor(colors[2]);
    setSecondaryColor(colors[3]);
    setAccentColor(colors[4]);

    setOriginalColors({
      text: colors[0],
      background: colors[1],
      primary: colors[2],
      secondary: colors[3],
      accent: colors[4],
    });

    setHueAdjustment(0);
    setSaturationAdjustment(0);
    setBrightnessAdjustment(0);
    setTemperatureAdjustment(0);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        colorEditorRef.current &&
        !colorEditorRef.current.contains(event.target) &&
        !event.target.closest(".slidersHorizontalButton")
      ) {
        setShowColorEditor(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copyToClipboard = () => {
    const textWithoutHash = textColor.replace("#", "");
    const backgroundWithoutHash = backgroundColor.replace("#", "");
    const primaryWithoutHash = primaryColor.replace("#", "");
    const secondaryWithoutHash = secondaryColor.replace("#", "");
    const accentWithoutHash = accentColor.replace("#", "");

    navigator.clipboard.writeText(
      `text: "0x${textWithoutHash}"\nbackground: "0x${backgroundWithoutHash}"\nprimary: "0x${primaryWithoutHash}"\nsecondary: "0x${secondaryWithoutHash}"\naccent: "0x${accentWithoutHash}"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles = {
    colorSelector: {
      backgroundColor: darkMode ? "#1e1e2e" : "#FFFFFF",
      color: darkMode ? "#FFFFFF" : "#000000",
      padding: "8px 12px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "relative",
    },
    copyNotification: {
      position: "absolute",
      top: "-40px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: darkMode ? "#2d2d3d" : "#333333",
      color: "#FFFFFF",
      padding: "4px 12px",
      borderRadius: "4px",
      zIndex: 100,
    },
    colorEditor: {
      position: "absolute",
      bottom: "60px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: darkMode ? "#1e1e2e" : "#FFFFFF",
      color: darkMode ? "#FFFFFF" : "#000000",
      width: "300px",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
      zIndex: 100,
    },
    sliderContainer: {
      marginBottom: "12px",
    },
    sliderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "4px",
    },
    slider: {
      width: "100%",
      height: "24px",
      appearance: "none",
      borderRadius: "12px",
      outline: "none",
    },
    hueSlider: {
      background:
        "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
    },
    saturationSlider: {
      background: "linear-gradient(to right, #f2f2f2, #ff0000)",
    },
    brightnessSlider: {
      background: "linear-gradient(to right, #000000, #888888, #ffffff)",
    },
    temperatureSlider: {
      background: "linear-gradient(to right, #5882FA, #F2F2F2, #FA5858)",
    },
    valueInput: {
      width: "50px",
      padding: "2px 4px",
      textAlign: "center",
      border: darkMode ? "1px solid #444" : "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: darkMode ? "#2d2d3d" : "#FFFFFF",
      color: darkMode ? "#FFFFFF" : "#000000",
    },
  };

  const hexToHSL = (hex) => {
    let r = parseInt(hex.substr(1, 2), 16) / 255;
    let g = parseInt(hex.substr(3, 2), 16) / 255;
    let b = parseInt(hex.substr(5, 2), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToHex = (h, s, l) => {
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h / 360 + 1 / 3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1 / 3);
    }

    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const adjustColor = (originalHexColor) => {
    const hsl = hexToHSL(originalHexColor);

    const brightScale = 0.4;
    const satScale = 1;

    let tempAdjustedHue = hsl.h;
    if (temperatureAdjustment !== 0) {
      tempAdjustedHue = (hsl.h - temperatureAdjustment) % 360;
      if (tempAdjustedHue < 0) tempAdjustedHue += 360;
    }

    const newHue = (tempAdjustedHue + hueAdjustment * 0.5) % 360;
    const newSaturation = Math.max(
      0,
      Math.min(100, hsl.s + saturationAdjustment * satScale)
    );
    const newBrightness = Math.max(
      0,
      Math.min(100, hsl.l + brightnessAdjustment * brightScale)
    );
    return hslToHex(newHue, newSaturation, newBrightness);
  };

  const updateAllColors = () => {
    setTextColor(adjustColor(originalColors.text));
    setBackgroundColor(adjustColor(originalColors.background));
    setPrimaryColor(adjustColor(originalColors.primary));
    setSecondaryColor(adjustColor(originalColors.secondary));
    setAccentColor(adjustColor(originalColors.accent));
  };

  const handleSliderChange = (type, value) => {
    switch (type) {
      case "hue":
        setHueAdjustment(value);
        break;
      case "saturation":
        setSaturationAdjustment(value);
        break;
      case "brightness":
        setBrightnessAdjustment(value);
        break;
      case "temperature":
        setTemperatureAdjustment(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateAllColors();
  }, [
    hueAdjustment,
    saturationAdjustment,
    brightnessAdjustment,
    temperatureAdjustment,
  ]);

  const handleColorChange = (setter, colorKey, value) => {
    setter(value);
    setOriginalColors((prev) => ({
      ...prev,
      [colorKey]: value,
    }));
  };

  const toggleColorEditor = () => {
    setShowColorEditor(!showColorEditor);
  };

  const resetAdjustments = () => {
    setHueAdjustment(0);
    setSaturationAdjustment(0);
    setBrightnessAdjustment(0);
    setTemperatureAdjustment(0);
  };

  return (
    <div className="colorNav bottom-4 fixed left-1/2 -translate-x-1/2 w-full max-w-[95vw]">
      <div
        className="colorSelector flex gap-1 sm:gap-2 items-center transition-colors duration-300"
        style={styles.colorSelector}
      >
        <input
          type="color"
          value={textColor}
          onChange={(e) =>
            handleColorChange(setTextColor, "text", e.target.value)
          }
          className="selectColor cursor-pointer colorSwatch small-viewport-input"
        />
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) =>
            handleColorChange(setBackgroundColor, "background", e.target.value)
          }
          className="selectColor cursor-pointer colorSwatch small-viewport-input"
        />
        <input
          type="color"
          value={primaryColor}
          onChange={(e) =>
            handleColorChange(setPrimaryColor, "primary", e.target.value)
          }
          className="selectColor cursor-pointer colorSwatch small-viewport-input"
        />
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) =>
            handleColorChange(setSecondaryColor, "secondary", e.target.value)
          }
          className="selectColor cursor-pointer colorSwatch small-viewport-input"
        />
        <input
          type="color"
          value={accentColor}
          onChange={(e) =>
            handleColorChange(setAccentColor, "accent", e.target.value)
          }
          className="selectColor cursor-pointer colorSwatch small-viewport-input"
        />
        <div
          className="randomColorButton cursor-pointer small-viewport-icon"
          onClick={generateRandomMultipleColors}
        >
          <Shuffle size={24} className="randomColorIcon" />
        </div>
        <div
          className="slidersHorizontalButton cursor-pointer small-viewport-icon"
          onClick={toggleColorEditor}
        >
          <SlidersHorizontal size={24} className="slidersHorizontalIcon" />
        </div>
        <div
          className="darkModeButton cursor-pointer small-viewport-icon"
          onClick={() => {
            setDarkMode(!darkMode);
            setTextColor(darkMode ? "#1e1e2e" : "#FFFFFF");
            setBackgroundColor(darkMode ? "#FFFFFF" : "#1e1e2e");
          }}
        >
          {darkMode ? (
            <Moon size={24} className="darkModeIcon" />
          ) : (
            <Sun size={24} className="darkModeIcon" />
          )}
        </div>
        <div
          className="copyColorButton cursor-pointer small-viewport-icon"
          onClick={copyToClipboard}
        >
          <Copy size={24} className="copyColorIcon" />
          {copied && <div style={styles.copyNotification}>Copied!</div>}
        </div>
      </div>
      {showColorEditor && (
        <div ref={colorEditorRef} style={styles.colorEditor}>
          <div style={styles.sliderContainer}>
            <div style={styles.sliderHeader}>
              <span>Hue</span>
              <input
                type="text"
                value={hueAdjustment}
                style={styles.valueInput}
                onChange={(e) =>
                  handleSliderChange("hue", parseInt(e.target.value) || 0)
                }
              />
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={hueAdjustment}
              onChange={(e) =>
                handleSliderChange("hue", parseInt(e.target.value))
              }
              style={{ ...styles.slider, ...styles.hueSlider }}
            />
          </div>

          <div style={styles.sliderContainer}>
            <div style={styles.sliderHeader}>
              <span>Saturation</span>
              <input
                type="text"
                value={saturationAdjustment}
                style={styles.valueInput}
                onChange={(e) => {
                  const val = e.target.value.replace("+", "");
                  handleSliderChange("saturation", parseInt(val) || 0);
                }}
              />
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={saturationAdjustment}
              onChange={(e) =>
                handleSliderChange("saturation", parseInt(e.target.value))
              }
              style={{ ...styles.slider, ...styles.saturationSlider }}
            />
          </div>

          <div style={styles.sliderContainer}>
            <div style={styles.sliderHeader}>
              <span>Brightness</span>
              <input
                type="text"
                value={brightnessAdjustment}
                style={styles.valueInput}
                onChange={(e) =>
                  handleSliderChange(
                    "brightness",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={brightnessAdjustment}
              onChange={(e) =>
                handleSliderChange("brightness", parseInt(e.target.value))
              }
              style={{ ...styles.slider, ...styles.brightnessSlider }}
            />
          </div>

          <div style={styles.sliderContainer}>
            <div style={styles.sliderHeader}>
              <span>Temperature</span>
              <input
                type="text"
                value={temperatureAdjustment}
                style={styles.valueInput}
                onChange={(e) =>
                  handleSliderChange(
                    "temperature",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={temperatureAdjustment}
              onChange={(e) =>
                handleSliderChange("temperature", parseInt(e.target.value))
              }
              style={{ ...styles.slider, ...styles.temperatureSlider }}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={resetAdjustments}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded small-viewport-button"
              style={{
                backgroundColor: darkMode ? "#555" : "#3B82F6",
                color: "#FFF",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reset Adjustments
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 400px) {
          .small-viewport-input {
            width: 30px !important;
            height: 30px !important;
          }

          .small-viewport-icon svg {
            width: 20px !important;
            height: 20px !important;
          }

          .small-viewport-button {
            padding: 4px 8px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
