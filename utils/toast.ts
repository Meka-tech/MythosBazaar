import { toast } from "react-toastify";

export const showErrorToast = (err: unknown) => {
  const message =
    (err as any)?.reason ||
    (err as any)?.data?.message ||
    (err as any)?.message ||
    "Something went wrong";
  toast.error(message);
};
