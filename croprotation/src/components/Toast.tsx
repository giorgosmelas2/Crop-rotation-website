import { Toaster } from 'react-hot-toast';

const ToastManager = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "10px",
        padding: "12px 16px",
      },
    }}
  />
);

export default ToastManager;