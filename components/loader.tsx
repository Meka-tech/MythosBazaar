import { BiLoaderAlt } from "react-icons/bi";

export const Loader = ({ size = 24, color = "white" }) => (
  <BiLoaderAlt size={size} color={color} className="animate-spin " />
);
