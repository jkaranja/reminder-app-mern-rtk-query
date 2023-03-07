import React from "react";
import { toast } from "react-toastify";

function showToast({ message, isLoading, isSuccess, isError, progress }) {
  let toastId = "uuid";
  if (isLoading) {
    toast.info(`Loading...${progress ? progress + "%" : ""}`, {
      toastId,
      progress,
      autoClose: false,
    });

    return;
  }
  if (isSuccess) {
    toast.update(toastId, {
      render: message,
      type: "success",
      autoClose: 5000,
    });
    return;
  }
  if (isError) {
    toast.update(toastId, {
      render: message,
      type: "error",
      autoClose: 5000,
    });
    return;
  }

  toast.dismiss(toastId);
  return;
}

export default showToast;
