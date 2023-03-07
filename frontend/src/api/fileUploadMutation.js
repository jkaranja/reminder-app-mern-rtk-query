import axios from "axios";
import React from "react";
import { setUploadProgress } from "../features/notes/notesSlice";

const fileUploadMutation = ({ url }) => {
  return async (formData, api) => {

    
    try {
      const result = await axios.post(url, formData, {
        //...config options i.e headers, progress
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor(
            ((loaded / 1000) * 100) / (total / 1000)
          );
          api.dispatch(setUploadProgress(percentage));
        },
      });

      return { data: result.data }; //queryFn must return data property
    } catch (axiosError) {
      let err = axiosError;
      //queryFn must return error property as well
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export default fileUploadMutation;
