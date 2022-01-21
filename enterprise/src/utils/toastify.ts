import { toast } from "react-toastify";
import { ErrorAxios } from "../interfaces";

type Toast = {
  type: "error" | "success" | "default" | "info" | "warning";
  message: string;
};

export function throwToastError(error: any, logoutUser: any = null) {
  const errors = error as ErrorAxios;
  if (errors.response.status === 401) {
    logoutUser();
  } else {
    toast.error(errors.response.data, { delay: 0 });
  }
}

export const throwToastSucess = ({ message }: Toast) => {
  return toast.success(message);
};
