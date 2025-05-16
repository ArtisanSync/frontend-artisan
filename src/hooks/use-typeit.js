import TypeIt from "typeit";
import { useEffect, useRef } from "react";

export default function (option = {}) {
  const typingRef = useRef(null);

  useEffect(() => {
    if (!typingRef.current) return;
    const instance = new TypeIt(typingRef.current, {
      speed: 90,
      loop: true,
      ...option,
    });
    instance.type("Welcome to Artisan Sync");
    instance.go();

    return () => {
      instance.destroy();
    };
  }, []);

  return typingRef;
}
