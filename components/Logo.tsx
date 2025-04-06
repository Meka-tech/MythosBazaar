import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImg from "@/assets/images/mythos-bazaar-logo.png";

const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="text-lg md:text-2xl font-bold flex items-center gap-2"
      >
        <Image
          src={LogoImg}
          alt="logo"
          className="w-8 h-8 md:w-10 md:h-10 object-cover"
        />
        MythosBazaar
      </Link>
    </div>
  );
};

export default Logo;
