import { toast } from "react-toastify";

type Toast = {
  type: "error" | "success" | "default" | "info" | "warning";
  message: string;
};

export function throwToast({ message, type }: Toast) {
  return toast(message, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    type,
    pauseOnHover: true,
    draggable: true,
  });
}
