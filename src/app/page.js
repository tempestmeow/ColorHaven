import BlobIllustration from "./components/BlobIllustration";
import ColorNavigation from "./components/ColorNavigation";
import ColorSelectorIllustration from "./components/ColorSelectorIllustration";
import Header from "./components/Header";
import Selection from "./components/Selection";

export default function Home() {
  return (
    <div className="page flex-col items-center justify-center">
      <Header />
      <div className="MainPage pt-17 flex justify-center items-center">
        <div className="p1 flex justify-center items-center">
          <ColorSelectorIllustration />
        </div>
      </div>
      <ColorNavigation />
    </div>
  );
}
