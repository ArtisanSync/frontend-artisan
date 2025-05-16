import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const useAos = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);
};

export default useAos;
