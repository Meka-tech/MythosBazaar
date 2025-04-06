import Image1 from "@/assets/images/pfp/1.jpg";
import Image2 from "@/assets/images/pfp/2.jpg";
import Image3 from "@/assets/images/pfp/3.jpg";
import Image4 from "@/assets/images/pfp/4.jpg";
import Image5 from "@/assets/images/pfp/5.jpg";
import Image6 from "@/assets/images/pfp/6.jpg";
import Image7 from "@/assets/images/pfp/7.jpg";
import Image8 from "@/assets/images/pfp/8.jpg";
import Image9 from "@/assets/images/pfp/9.jpg";
import Image10 from "@/assets/images/pfp/10.jpg";
import Image11 from "@/assets/images/pfp/11.jpg";
import Image12 from "@/assets/images/pfp/12.jpg";
import Image13 from "@/assets/images/pfp/13.jpg";
import Image14 from "@/assets/images/pfp/14.jpg";
import Image15 from "@/assets/images/pfp/15.jpg";
import Image16 from "@/assets/images/pfp/16.jpg";

export const GetProfileImage = (walletAddress) => {
  const lastChar = walletAddress.slice(-1).toLowerCase();

  const hexImageMap = {
    0: Image1,
    1: Image2,
    2: Image3,
    3: Image4,
    4: Image5,
    5: Image6,
    6: Image7,
    7: Image8,
    8: Image9,
    9: Image10,
    a: Image11,
    b: Image12,
    c: Image13,
    d: Image14,
    e: Image15,
    f: Image16
  };

  return hexImageMap[lastChar] || hexImageMap["0"];
};
