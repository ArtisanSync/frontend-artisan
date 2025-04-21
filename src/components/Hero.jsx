import { Button } from "./ui/button";

function Hero() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <img
          className="float-left mt-[112.56px]"
          src="left-banner.svg"
          alt=""
        />
        <img className="float-right" src="/right-banner.svg" alt="" />
      </div>

      <div className="absolute inset-0 z-1">
        <div className="ml-[88px] mt-[185px]">
          <p className="text-[40px] font-bold mb-[32px]">
            welcome to Artisan Sync
          </p>
          <p className="text-[16px] w-1/3 mb-[75px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant
            cras morbi hendrerit nunc vel sapien. In habitasse at diam
            suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut
            donec in. Ac diam, at sed cras nisi.{" "}
          </p>
          <Button className={"bg-[#216EEC] w-[195px] h-[43px]"}>
            lets work together
          </Button>
        </div>
      </div>
    </>
  );
}

export default Hero;
