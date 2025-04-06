import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImg from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="text-lg md:text-2xl font-bold flex items-center gap-1"
      >
        <Image
          src={LogoImg}
          alt="logo"
          className="w-10 h-10 md:w-14 md:h-14 object-cover"
        />
        MythosBazaar
      </Link>
    </div>
  );
};

export default Logo;
