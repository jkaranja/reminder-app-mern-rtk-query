import { apiSlice } from "../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //fetch Users
    getUser: builder.query({
      query: () => ({
        url: `/users`,
        // validateStatus: (response, result) => {
        //   return response.status === 200 && !result.isError;
        // },
      }),
      transformErrorResponse: (response, meta, arg) => response.data.message,
      providesTags: (result, error, id) =>
        // is result available?//data already cached
        result
          ? [{ type: "User", id: result.id }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "User", id: "PROFILE" }], //if initially fetch returned 'no record found' error
    }),
    //add new user
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: `/users/register`,
        method: "POST",
        body: userInfo,
      }),
      transformErrorResponse: (response, meta, arg) => response.data.message,
      //refetch after new record is added
      // invalidatesTags: (result, error, arg) => [
      //   { type: "User", id: "PROFILE" },
      // ],
    }),
    //resend email
    resendVerifyEmail: builder.mutation({
      query: () => ({
        url: `users/resend/email`,
        method: "POST",
      }),
      transformErrorResponse: (response, meta, arg) => response.data.message,
      // invalidatesTags: (result, error, arg) => [
      //   { type: "User", id: "PROFILE" },
      // ],
    }),
    //update user
    updateUser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `users/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: userData,
      }),
      transformErrorResponse: (response, meta, arg) => response.data.message,
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    //delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response, meta, arg) => response.data.message,
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useResendVerifyEmailMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
