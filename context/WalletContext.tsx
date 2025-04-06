"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  signer: ethers.JsonRpcSigner | null;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  signer: null,
  walletAddress: null,
  connectWallet: async () => {},
  disconnectWallet: async () => {}
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const checkIfWalletConnected = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        setSigner(signer);
        setWalletAddress(await signer.getAddress());
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setSigner(signer);
      setWalletAddress(await signer.getAddress());
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  const disconnectWallet = async () => {
    setSigner(null);
    setWalletAddress(null);
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        (window.ethereum as any).removeAllListeners();
      } catch (error) {
        console.error("Error removing listeners:", error);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{ signer, walletAddress, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
