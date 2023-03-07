import fileUploadMutation from "../../api/fileUploadMutation";
import { apiSlice } from "../../app/api/apiSlice";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //fetch Notes
    getNotes: builder.query({
      query: ({
        currentPage,
        itemsPerPage,
        debouncedSearchTerm,
        dateFilter,
      }) => ({
        url: `/notes?page=${currentPage}&size=${itemsPerPage}&search=${debouncedSearchTerm}&fromDate=${
          dateFilter?.fromDate || ""
        }&toDate=${dateFilter?.toDate || ""}`,
        // validateStatus: (response, result) => {
        //   return response.status === 200 && !result.isError;
        // },
      }),

      transformErrorResponse: (response, meta, arg) => response.data?.message,
      providesTags: (result) =>
        // is result available?//data from db form = {pages, notes[]}
        result?.notes
          ? [
              ...result?.notes?.map(({ _id:id }) => ({ type: "Note", id })),
              { type: "Note", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Note", id: "LIST" }], //if initially fetch returned 'no record found' error
    }),
    //get note by id
    getNote: builder.query({
      query: (id) => ({
        url: `/notes/${id}`,
      }),
      transformErrorResponse: (response, meta, arg) => response.data?.message,
      providesTags: (result, error, id) => [{ type: "Note", id }],
    }),
    //add new note
    addNote: builder.mutation({
      query: (noteData) => ({
        url: `/notes`,
        method: "POST",
        // fetchBaseQuery by default automatically adds `content-type: application/json` to
        // the Headers//you can also set headers in prepareHeaders inside fetchBaseQuery({})
        headers: {
          "content-type": "multipart/form-data",
        },
        body: noteData,
      }),
      //queryFn: fileUploadMutation({ url: "/notes" }),

      transformErrorResponse: (response, meta, arg) => response.data?.message,
      //refetch after new record is added
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: "LIST" }],
    }),
    //update note
    updateNote: builder.mutation({
      query: ({ noteData, id }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: noteData,
      }),
      transformErrorResponse: (response, meta, arg) => response.data?.message,
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    //delete Note
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response, meta, arg) => response.data?.message,
      invalidatesTags: (result, error, id) => [{ type: "Note", id }],
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
