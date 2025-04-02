import React from "react";

export default function Header() {
  return (
    <div className="header flex justify-between w-full fixed">
      <div className="headerIcon">Color Haven</div>
      <div className="headerNav flex gap-4">
        <div className="aboutNav">About</div>
        <div className="toolsNav">Tools</div>
      </div>
    </div>
  );
}
