"use client";

import BlobIllustration from "./components/BlobIllustration";
import ColorNavigation from "./components/ColorNavigation";
import ColorSelectorIllustration from "./components/ColorSelectorIllustration";
import Header from "./components/Header";
import { useState } from "react";

export default function Home() {
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [primaryColor, setPrimaryColor] = useState("#5314FF");
  const [secondaryColor, setSecondaryColor] = useState("#FF6633");
  const [accentColor, setAccentColor] = useState("#33FF66");

  return (
    <div className="page flex-col items-center justify-center">
      <Header />
      <div className="MainPage pt-17 flex justify-center items-center">
        <div className="p1 flex justify-center items-center">
          <div className="flex-col">
            <div className="">Pallete Visualizer</div>
            <div className="">
              Play with pigments to match your creative energy.
            </div>
          </div>
          <ColorSelectorIllustration primaryColor={primaryColor} />
        </div>
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
      />
    </div>
  );
}
