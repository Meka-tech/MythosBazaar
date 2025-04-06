import React, { ReactElement, useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/UseClickOutside";

interface IProps {
  isActive: boolean;
  closeModal: () => void;
  children?: ReactElement;
}

const Modal = ({ isActive, closeModal, children }: IProps) => {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    if (isActive) {
      closeModal();
    }
  });

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "unset";
  }, [isActive]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-60 transition-opacity duration-200 ${
        isActive ? "opacity-100 z-50" : "opacity-0 -z-50"
      }`}
    >
      <div ref={ref} className="max-w-md flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
