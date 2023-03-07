// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//rtk allows you revalidate data after a mutation i.e resync their local data cache with the server after performing a mutation (aka "revalidation").
//this done using cache tags//rtk manages cache in api using tags

function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

//the do this// providesTags: (result) => providesList(result, 'Post'),
//providesTags: (result) => providesList(result, 'User'),

export const postApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Posts"], //define tag types
  endpoints: (build) => ({
    getPosts: build.query({
      query: (page = 1) => `posts?page=${page}`,
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
              //{ type: 'Posts', id: 'PARTIAL-LIST' }, when using pagination to always refetch paginated data
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Posts", id: "LIST" }],
    }),
    addPost: build.mutation({
      query(body) {
        return {
          url: `post`,
          method: "POST",
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    updatePost: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `post/${id}`,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    deletePost: build.mutation({
      query(id) {
        return {
          url: `post/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }], //add to always invalidate query { type: 'Posts', id: 'PARTIAL-LIST' },

      //in case you don't want to use automated re-fetching using cache tags//not recommended, you can update cache manually
      //pessimistic update//you wait until mutation query was success to update getPost cache//can be auto of sync with server//use tag to refetch instead of updating cache only
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;//this is he deletePost query above
          const patchResult = dispatch(
            postApi.util.updateQueryData("getPost", id, (draft) => {
              Object.assign(draft, updatedPost);
            })
          );
        } catch {}
      },
    }),

    //this handles streaming of data in real time using web sockets
    async onCacheEntryAdded(
      arg,
      { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
    ) {},
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
