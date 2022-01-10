import { ToastContainer } from "react-toastify";

export function Toastify() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
