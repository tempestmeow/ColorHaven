import BlobIllustration from "./components/BlobIllustration";
import ColorNavigation from "./components/ColorNavigation";
import Header from "./components/Header";
import Selection from "./components/Selection";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <div className="MainPage pt-13">
        <div className="p1">
          <BlobIllustration />
          <ColorNavigation />
        </div>
        <div className="rectangleDiv"></div>
      </div>
    </div>
  );
}

//
