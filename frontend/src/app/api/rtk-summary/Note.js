import React from "react";

const Note = () => {
  let api = "";
  let useUpdatePostMutation;
  /**----------------
 *    FEtch single note
 ------------------------------*/

  //shallow equality check is performed on the overall return value of selectFromResult to determine whether to force a rerender.
  // An array/object declared here will maintain a stable reference rather than be re-created again on any re-rerender
  const emptyObject = {}; //maintain reference so the selectFromResult doesn't cause an additional re-render every time component re-renders as the object is re-created
  //

  // Will select the post with the given id, and will only rerender if the given posts data changes
  const { note } = api.useGetPostsQuery(undefined, {
    //use below in single note and use the same notes data cached/fetched already if you already have the results eg you will only see this page after having seen the notes list
    // // Will select the note with the given id, and will only rerender if the given posts data changes
    //here, the data will be replaced by note eg const { note } = api.useGetPostsQuery(undefined,{selectFromResult:})
    selectFromResult: ({ data }) => ({
      // note: data?.find((post) => post.id === id),
    }),

    // This call will result in an initial render returning an empty object for `note`,
    // and a second render when the data is received.
    // It will trigger additional rerenders only if the `note` data changes
    selectFromResult: ({ data }) => ({
      // note: data?.find((post) => post.id === id) ?? emptyObject,
    }),
  });

  /**----------------
 *    MUTATE/UPDATE single note
 ------------------------------*/
  //useMutation returns a tuple i.e mutation trigger fn and an object about the mutation
  //the trigger when called, fires off req to endpoint
  //this returns a promise with prop unwrap you can call to provide the raw response/error immediately after mutation
  //you can also use trigger().unwrap()//to access response immediately after mutation(instead of error, data returned by the hook)//this means that, you will be able to access payload directly as the value returned by the trigger, but this must be done inside try catch since errors must be caught. Otherwise default behavior handles response for you and put result in {data: ...} and error in {error: ..} of the useMutation hook
  //eg:
  //  try{
  //     const result = await login(values).unwrap();
  //                 console.log(result.data)
  //     } catch(err){
  //                 console.log(err)
  //   }

  const [updatePost, result] = useUpdatePostMutation({
    fixedCacheKey: "shared-update-post", //unlike in queries where subscribed components to same endpoint share results, mutation performs their queries independently//this fixedCacheKey can be added to same mutation to allow them share results in same or different components//
  });
  
  //    const [
  //     updatePost, // This is the mutation trigger
  //     { isLoading: isUpdating }, // This is the destructured mutation result
  //   ] = useUpdatePostMutation()

  const {
    data,// {data object from server} // The data returned from the latest trigger response, if present.//will be undefined until the next new data arrives
    error, //{data: {error object from server}, status: statusCodeFromServer}//- The error result if present.
    isUninitialized, //- When true, indicates that the mutation has not been fired yet.
    isLoading, //When true, indicates that the mutation has been fired and is awaiting a response.//unlike in query, a mutation doesn't have refetching concept, so isLoading is always either false or true regardless of first or subsequent requests
    isSuccess, //When true, indicates that the last mutation fired has data from a successful request.
    isError, //When true, indicates that the last mutation fired resulted in an error state.
    reset, //A method to reset the hook back to it's original state and remove the current result from the cache } = result
  } = result;
 
  return (
    <div>
      Note
      <div>
        {error.status} {JSON.stringify(error.data)}
      </div>
    </div>
  );
};

export default Note;
