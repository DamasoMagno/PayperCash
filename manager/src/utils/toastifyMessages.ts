import { toast } from "react-toastify";
import { ErrorAxios } from "../interfaces";

export function throwToastSucess(message: string) {
  return toast.success(message);
}

export function throwToastError(error: any, logoutUser: any = null){
  const errors = error as ErrorAxios; 
  if(errors.response.status === 401){
    logoutUser();
  } else {
    toast.error(errors.response.data);
  }
}