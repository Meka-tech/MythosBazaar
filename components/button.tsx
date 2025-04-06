import React from "react";
import { Loader } from "./loader";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  loading?: boolean;
}

const PrimaryButton: React.FC<IProps> = ({
  text,
  className,
  loading,
  ...rest
}) => {
  const mergedClasses = twMerge(
    "w-full cursor-pointer bg-sky-500 hover:bg-sky-400 text-white p-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 flex justify-center items-center whitespace-nowrap disabled:opacity-60",
    className
  );

  return (
    <button className={mergedClasses} {...rest}>
      {loading ? <Loader /> : <span>{text}</span>}
    </button>
  );
};

export default PrimaryButton;
