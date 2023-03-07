import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../../config/urls";

//createApi options
// createApi({

//     baseQuery:
//     tagTypes:
//     endpoints: (build) =>({getNotes: build.query({query: ()=>{}, ...others})})
//  })

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
  }),
  // global configuration for the api
  keepUnusedDataFor: 30, //data will be kept in the cache as long as there at least one component subscribed to the data
  //when subscription count hits zero(components unmounts), there will be 60 secs wait for data to be cleared from cache
  //this value can be changed using keepUnusedDataFor in secs//remove not needed for now
  // global configuration for the api//see explanation in useQuery
  refetchOnMountOrArgChange: 30, //or true to always fetch on mount//when useQuery is called//see useQuery
  // global configuration for the api
  refetchOnFocus: true, //allows you to control whether RTK Query will try to refetch all subscribed queries after the application window regains focus.
  // global configuration for the api
  refetchOnReconnect: true, //allows you to control whether RTK Query will try to refetch all subscribed queries after regaining a network connection.
  tagTypes: ["Note", "User"], //defines tags//can be ["Post", "User"],//possible tags that could be provided by endpoints
  endpoints: (build) => ({
    getNotes: build.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => "/notes", //or as an object ({ url: `post/${id}` }),//default mtd is GET
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 5, //not needed
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => {
        //response = {your response object from server}// = data returned by hook
        //normalizing the response//altho not required with rtk//you can normalize it if you want//
        //below will return {1:{}} //you can also use createEntityAdapter for ids[1,2], entities: {id:{}}
        //      transformResponse: (response) =>
        // response.reduce((acc, curr) => {
        //   acc[curr.id] = curr
        //   return acc
        // }, {}),
      },

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status, //response = {data: {message: "error"}, status: statusCode}
      providesTags: ["Note"], //will be invalidated by any endpoint that invalidate with type ["Note"] only//not with id
      //=[{ type: 'Post' }]//provide tags to refetch(if component subscribed) or remove data if mutation with same tag invalidate this data fetched
      //this can be ["Note"], [{type: 'Post', id: 1|| 'LIST'}], or (result, error, args of query eg id)=>["post"]
      //["note"]//this is too general//add id to distinguish btwn a specific instance of a tag type and general tag
      //use with [{type: 'Post', id: 1}, {type: 'Post', id:'LIST'}]//future mutations can invalidate based on id and LIST
      providesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],//a cb that returns a tag as array
      //use arg.id if id was passed to query as object else replace arg with id//arg rep query params passed to query
      //others
      //async onQueryStarted
      //async onCacheEntryAdded
    }),

    getUsers: build.query({
      query: ({ formData }) => "/users",
      providesTags: ["User"],
    }),

    //mutation send updates to server and apply changes to local cache i.e can invalidate data & force refetch

    addNote: build.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: "POST", //can be any valid http verb matching api route on backend
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data, //this data will be stored as cache data//else the payload from server is used by default//returned by default
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,

      invalidatesTags: ["Note"], //this is too general//this will cause any endpoint with type Post to refetch regardless of id
      //provide a specific post to only affect  just a few endpoint that match both type and id eg [{ type: 'Post', id: 'LIST' }]
      //others
      //async onQueryStarted
      //async onCacheEntryAdded
    }),
    updatePost: build.mutation({
      query: (body) => ({
        url: `post/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  usePrefetch,
  useGetNotesQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
