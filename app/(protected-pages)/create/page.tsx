"use client";
import React, { useMemo, useState } from "react";
import { useWallet } from "@/context/WalletContext";
import ConnectButton from "@/components/ConnectButton";
import WalletItem from "@/components/WalletItem";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { uploadImage, uploadJson } from "@/actions/upload";
import { mintNFT } from "@/actions/mintNft";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import PrimaryButton from "@/components/button";
import { MdOutlineFileUpload } from "react-icons/md";
import NavVariant from "@/components/Navbar/navVariant";
import { showErrorToast } from "@/utils/toast";
import { toast } from "react-toastify";

export default function Create() {
  const router = useRouter();

  const { signer } = useWallet();
  const priceMinimum = "0.1";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
    price: priceMinimum
  });
  const [uploading, setUploading] = useState(false);

  const createDisabled = useMemo(() => {
    if (
      !(
        formData.image &&
        formData.description &&
        formData.price &&
        formData.title
      )
    ) {
      return true;
    }
    return false;
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.name === "price" &&
      Number(e.target.value) < Number(priceMinimum)
    ) {
      setFormData({ ...formData, price: "0.1" });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const maxSize = 5 * 1024 * 1024;

        const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);

        if (validFiles.length === 0) {
          alert("File size must be 5MB or less.");
          return;
        }
        setFormData({
          ...formData,
          image: acceptedFiles[0]
        });
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setUploading(true);
    e.preventDefault();
    try {
      if (!signer) {
        alert("Please connect your wallet first.");
        return;
      }
      if (
        !(
          formData.image &&
          formData.description &&
          formData.price &&
          formData.title
        )
      ) {
        return;
      }

      const imageUri = await uploadImage(formData.image);

      const data = {
        title: formData.title,
        description: formData.description,
        image: imageUri
      };
      const tokenURI = await uploadJson(data);
      if (!tokenURI) {
        throw new Error("Invalid Token");
        return;
      }

      const tokenId = await mintNFT(tokenURI, formData.price, signer);
      router.push(`/nft/${tokenId}`);
      toast.success(`NFT was created successfully`);
    } catch (err) {
      showErrorToast(err);
    } finally {
      setUploading(false);
    }
  };

  if (!signer) {
    return;
  }
  return (
    <section className="w-full min-h-dvh">
      <NavVariant />
      <div className="pt-5 md:pt-10 px-2 md:px-0 ">
        <h1 className="font-extrabold text-2xl md:text-4xl mb-1 md:mb-2">
          Create an NFT
        </h1>
        <p className="md:text-lg">
          This is a testnet and not a real market place, your NFT will be
          created on Sepolia eth
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="w-full  md:grid grid-cols-2 gap-x-10">
            <div className="w-full mb-4 md:mb-0">
              <div
                {...getRootProps()}
                className=" w-80 h-80 md:w-full ml-auto mr-auto md:h-full bg-neutral-900 rounded-lg px-2 py-6 text-white outline-none text-center cursor-pointer border-2 border-dashed border-neutral-800 hover:border-neutral-700 transition-all  flex items-center justify-center relative"
              >
                <input {...getInputProps()} />
                {formData.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(formData.image)}
                    alt={formData.image.name}
                    className="absolute w-full h-full top-0 left-0 object-cover bg-black"
                  />
                ) : isDragActive ? (
                  <p>Drop the image here...</p>
                ) : (
                  <div className="flex flex-col items-center gap-1 justify-center">
                    <MdOutlineFileUpload size={30} />
                    <p className="inline-flex">Drag &amp; drop media</p>
                    <p className="text-sm text-neutral-700">max size: 5MB</p>
                    <p className="text-sm text-neutral-700">PNG,JPG</p>
                  </div>
                )}
              </div>
            </div>
            <div className="h-full">
              <div className="mb-6">
                <label className="block text-neutral-300 mb-2 font-semibold ">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-neutral-900 rounded-lg px-2 py-2 text-white outline-none "
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-neutral-300 mb-2 font-semibold ">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-neutral-900 rounded-lg px-3 py-2 text-white outline-none min-h-40 resize-none"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="flex w-full items-center justify-between">
                  <label className="block text-neutral-300 mb-2 font-semibold ">
                    Price (ETH)
                  </label>
                  <p className="text-xs text-neutral-700">fee : 0.0015 ETH</p>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.1"
                  min={priceMinimum}
                  className="w-full bg-neutral-900 rounded-lg px-2 py-2 text-white outline-none"
                  required
                />
              </div>
              <PrimaryButton
                type="submit"
                text="Create"
                loading={uploading}
                disabled={createDisabled}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
