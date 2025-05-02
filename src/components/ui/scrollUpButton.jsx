"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollUpIcon from "../../../public/scroll-up.svg";

function ScrollUpButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  });

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-[10%] right-[10%] z-30 transition-transform duration-300 hover:scale-110"
          onClick={scrollUp}
        >
          <Image
            src={ScrollUpIcon}
            alt="Scroll Up Icon"
            width={50}
            height={50}
          ></Image>
        </button>
      )}
    </>
  );
}

export default ScrollUpButton;
