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
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={scrollUp}
          aria-label="Scroll to top"
        >
          <Image
            src={ScrollUpIcon}
            alt="Scroll Up"
            width={24}
            height={24}
            className="text-white"
          />
        </button>
      )}
    </>
  );
}

export default ScrollUpButton;
