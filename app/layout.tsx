import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WalletProvider } from "../context/WalletContext";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MythosBazaar",
  description: "Buy and sell Mythical creatures NFTs on the blockchain"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}
        >
          <div className="container mx-auto ">
            <main className="px-2">{children}</main>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Footer />
          </div>
        </body>
      </html>
    </WalletProvider>
  );
}
