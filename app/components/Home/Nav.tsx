"use client";
import Link from "next/link";
import LogoImage from "@../../../public/images/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Nav: React.FC = () => {
  const pathname = usePathname();
  if (pathname === "/signup" || pathname === "/login") {
    return null;
  }

  return (
    <div className="shadow-md overflow-hidden h-[11vh]  ">
      <div className=" w-[90%] md:w-[80%] h-[100%] mx-auto flex justify-between items-center">
        {/* logo */}
        <div className=" w-[200px] h-[200px]">
          <Link href={"/"}>
            <Image
              src={LogoImage}
              width={250}
              height={250}
              alt="Logo"
              className="w-[100%] h-[100%]"
            />
          </Link>
        </div>
        {/* signup button */}
        <div className="flex justify-center  items-center">
          <Link href="/signup">
            <button className="bg-[#008AEB] px-6 py-2 border-[1px] text-white rounded-sm font-semibold uppercase">
              signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Nav;
