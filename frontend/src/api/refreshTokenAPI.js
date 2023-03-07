import axios from "axios";
import { BASE_URL } from "../config/urls";

import store from "../app/store";

import { setCredentials } from "../features/auth/authSlice";

const refreshTokenAPI = async (dispatch) => {
  const client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, //or add axios.defaults.withCredentials = true in app.js or top of file//for any req setting or sending cookies
  });

  try {
    const {
      data: { accessToken },
    } = await client.get("/api/auth/refresh");

    //watch out for circular dependency issue when importing the store
    //this function shouldn't appear anywhere in a tree that is connected to the store
    //eg using axiosPrivate in createAsyncThunk()
    store.dispatch(setCredentials(accessToken));

    return accessToken;
  } catch (error) {
    //navigate to login
    console.error("error");
    return null;
  }
};

export default refreshTokenAPI;
