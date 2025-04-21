import Link from "next/link";

function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-20">
        <div className="flex justify-between mx-[88px] my-[14.51px]">
          <div className="flex items-center gap-[32px]">
            <img src="artisan-logo.svg" alt="" />
            <p className="text-[12px] ">ARTISAN SYNC</p>
          </div>

          <div className="flex gap-[55px] items-center">
            <Link href="" className="text-[12px] hover:text-blue-600">
              ABOUT US
            </Link>
            <Link href="" className="text-[12px] hover:text-blue-600">
              SERVICE
            </Link>
            <Link href="" className="text-[12px] hover:text-blue-600">
              PROJECT
            </Link>
            <Link href="" className="text-[12px] hover:text-blue-600">
              TEAM
            </Link>
            <Link href="" className="text-[12px] hover:text-blue-600">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
