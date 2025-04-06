import React from "react";
import Logo from "../Logo";
import { FaBriefcase, FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="w-full px-2 pt-5 pb-10 mt-10 md:px-10 md:pt-10 md:pb-16 md:mt-20 border-t-[1px] border-neutral-800">
      <div className=" flex-col  md:flex-row flex w-full items-center justify-between">
        <Logo />
        <p className="text-sm text-neutral-500 mt-2 md:mt-0">
          Built by Nnaemeka Onyeji
        </p>
      </div>
      <div className="  w-full justify-center flex gap-4 mt-16 md:mt-4 text-sm text-neutral-400">
        <a
          href="mailto:nnaemekaonyeji27@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <MdEmail />
          Email
        </a>
        <a
          href="https://github.com/Meka-tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <FaGithub />
          GitHub
        </a>
        <a
          href="https://nnaemeka.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <FaBriefcase /> Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/samuel-onyeji-78a141256/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <FaLinkedin /> LinkedIn
        </a>
      </div>
      <p className="text-xs text-neutral-500 text-center mt-16">
        &copy; {new Date().getFullYear()} SPN .All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
