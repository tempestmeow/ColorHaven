import React from "react";

export default function Header({ style, handleClick, darkMode }) {
  return (
    <div
      className="header flex justify-between w-full fixed items-center transition-colors delay-50"
      style={style}
    >
      <div className="headerIcon">Color Haven</div>
      <div className="headerNav flex gap-4 items-center">
        <div
          className={
            darkMode
              ? "toolsNav cursor-pointer dark-header"
              : "toolsNav cursor-pointer"
          }
          onClick={() => handleClick(".p1")}
        >
          Contact
        </div>
        <div
          className={
            darkMode
              ? "toolsNav cursor-pointer dark-header"
              : "toolsNav cursor-pointer"
          }
          onClick={() => handleClick(".p2")}
        >
          Editor
        </div>
        <div
          className={
            darkMode
              ? "aboutNav cursor-pointer dark-header"
              : "aboutNav cursor-pointer"
          }
          onClick={() => handleClick(".contact-main")}
        >
          About
        </div>
      </div>
    </div>
  );
}
