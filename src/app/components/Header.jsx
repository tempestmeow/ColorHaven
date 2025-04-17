import React from "react";

export default function Header({ style }) {
  return (
    <div
      className="header flex justify-between w-full fixed items-center bg-white"
      style={style}
    >
      <div className="headerIcon">Color Haven</div>
      <div className="headerNav flex gap-4 items-center">
        <div className="aboutNav">About</div>
        <div className="toolsNav">Tools</div>
      </div>
    </div>
  );
}
