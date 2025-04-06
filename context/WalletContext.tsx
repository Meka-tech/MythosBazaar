"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  signer: ethers.JsonRpcSigner | null;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchToSepolia: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  signer: null,
  walletAddress: null,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  switchToSepolia: async () => {}
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

  const switchToSepolia = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const sepoliaChainId = "0xaa36a7"; // 11155111 in hex

      const currentChainId = await window.ethereum.request({
        method: "eth_chainId"
      });

      if (currentChainId === sepoliaChainId) {
        console.log("Already on Sepolia network");
        return;
      }

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }]
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Chain not added to MetaMask
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Ethereum Sepolia Testnet",
                nativeCurrency: {
                  name: "SepoliaETH",
                  symbol: "ETH",
                  decimals: 18
                },
                rpcUrls: ["https://rpc.sepolia.org"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"]
              }
            ]
          });
        } catch (addError) {
          console.error("Failed to add Sepolia:", addError);
        }
      } else {
        console.error("Failed to switch to Sepolia:", switchError);
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
      switchToSepolia();
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
      value={{
        signer,
        walletAddress,
        connectWallet,
        disconnectWallet,
        switchToSepolia
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
