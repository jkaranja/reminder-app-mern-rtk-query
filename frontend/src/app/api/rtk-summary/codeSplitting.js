// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
});

//
// import { emptySplitApi } from "./emptySplitApi";

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => "test",
    }),
  }),
  overrideExisting: false, //if false, in case you inject an endpoint that already exists, in dev, it won't be overridden. You will get a warning. In production, it will be overridden regardless and no warning displayed
});

  //export const { useExampleQuery } = extendedApi;
