import { toast } from "react-toastify";

export type ErrorAxios = {
  response: {
    data: string;
    status: number;
  }
};

export function showError(error: any, logoutUser: any = null){
  const errors = error as ErrorAxios; 

  if(errors.response.status === 401){
    logoutUser();
  } else {
    toast.error(errors.response.data);
  }
}