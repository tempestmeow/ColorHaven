export default function ColorNavigation() {
  return (
    <div className="colorNav">
      <div className="rectange-tester r1 bg-black w-64 h-64 rounded-2xl"></div>
      <div className="colorSelector">
        <input
          type="color"
          //   value={color}
          //   onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
}
