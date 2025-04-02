import Header from "./components/Header";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <div className="MainPage pt-13">
        <div className="rectangleDiv">
          <div className="r1"></div>
          <div className="r2"></div>
          <div className="r3"></div>
          <div className="r4"></div>
          <div className="r5"></div>
        </div>
      </div>
    </div>
  );
}
