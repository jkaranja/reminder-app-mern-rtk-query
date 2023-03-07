// Automatic re-authorization by extending fetchBaseQuery
// This example wraps fetchBaseQuery such that when encountering a 401 Unauthorized error, an additional request is sent to attempt to refresh an authorization token, and re-try to initial query after re-authorizing.

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { tokenReceived, loggedOut } from "./authSlice";



//this provides a wrapper function that must have function (args, api, extraOptions) and extends or wraps the fetchBaseQuery function
//you can also create a custom baseQuery function from scratch eg axios base query//
//see //https://redux-toolkit.js.org/rtk-query/usage/customizing-queries

const baseQuery = fetchBaseQuery({ baseUrl: "/" });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
    }
  }
  return result;
};

//Preventing multiple unauthorized errors
//Using async-mutex to prevent multiple calls to '/refreshToken' when multiple calls fail with 401 Unauthorized errors.

//import { tokenReceived, loggedOut } from "./authSlice";
//import { Mutex } from "async-mutex";

// create a new mutex
//const mutex = new Mutex();
const mutex = 'new Mutex();'
const baseQueryx = fetchBaseQuery({ baseUrl: "/" });
const baseQueryWithReauthx = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryx(
          "/refreshToken",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(tokenReceived(refreshResult.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          //api.dispatch(loggedOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

//for more examples including axios base query see
//https://redux-toolkit.js.org/rtk-query/usage/customizing-queries