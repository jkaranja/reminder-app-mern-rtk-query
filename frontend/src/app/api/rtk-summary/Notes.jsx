import React from "react";
import { useGetNotesQuery } from "../../app/api/apiSlice";
import { usePrefetch } from "./apiSlice";

const Notes = () => {
  //useQuery accepts two args/params(useQuery works same as useQuerySubscription//use useQuery=primary hook)
  //useQuery re-fetches every time query params passed when calling the hook changes. This is because cache key is generated from the endpoint and the these query params eg useQuery({x:1})// if x changes to 2//data is re-fetched whether this query params are used in the actual endpoint or not.//this concept also allow pagination to work on change of eg page
  //useQuery also re-fetches on first mount/subscription after page reload//can force to re-fetch every time the query is called in globally or to certain queries
  //It also runs due to cache tags invalidation by mutations
  //the query will run every time params change
  //queryArg is passed to .query cb to build url
  //since this performs GET, no data is expected, just query string
  //next is a queryOptions

  //tips, isLoading=(isFetching && !data) can be used to provide spinner or skeleton while (isFetching && data) to grey out old data when changing to page 2
  //but isLoading will be false if data exists i.e req already run earlier//not reliable//
  //use if(isFetching && !data) console.log('fetching) return//or currentData if arg//this ensures req is running for the 1st time//with currentData, if arg changes eg id is now 2, it will be undefined while data will be true since it has cached data for previous args//
  //use if(isFetching && data)// to grey out//this means req has ran at least once
  //use return to terminate execution then below if that is false, use if(isFetching) only for re-fetching
  const {
    data: notes, //The latest returned result regardless of hook arg, if present.//returns cached data if current query fails
    error, //error present
    isLoading, //query is loading(true) for the first time(Initial load) & no data/cache yet//not true for subsequent requests
    isSuccess,
    isFetching, //currently fetching but may contain data from earlier requests//true for first req and subsequent req s
    isError,
    isUninitialized, //query has not started yet//true
    refetch, //function to force refetch on demand//. call like refetch()//corresponds to a useQuery hook
    currentData, //latest returned result for the current hook arg, if present.It will be undefined during refetching & UNDEFINED if query fails/error//only if it queryArg is provide in query eg id
  } = useGetNotesQuery("queryArg", {
    skip: false, //default is false//skips running for render when true until skip is false//help get conditional fetching
    pollingInterval: 0, //default is zero//refetch on provided interval in ms eg 3000
    //selectFromResult //alters returned data to obtain subset of result
    refetchOnMountOrArgChange: false, //default=false//can be number in secs//force query to fetch on mount if true i.e any time new component calls useQuery//or refetch if enough time hs passed since the last query for same cache when number is provided in ms
    refetchOnFocus: false, //default=false//refetch when browser regains focus
    refetchOnReconnect: false, //default=false//refetch when regaining network connection
    //use below in single post and use the same notes data cached/fetched already
    // // Will select the note with the given id, and will only rerender if the given posts data changes
    //here, the data will be replaced by note eg const { note } = api.useGetPostsQuery(undefined,{selectFromResult:})
    //can also be used here in case you need to select specific list from Notes or anything else//not likely//see single note
    selectFromResult: ({ data }) => ({
      // note: data?.find((post) => post.id === id),
    }),
  });
  //query without hooks: const result = dispatch(api.endpoints.getPosts.initiate())
  //perform mutation without hooks: dispatch(api.endpoints.addPost.initiate({ name: 'foo' }))
  // const useGetPokemonByNameQuery =
  //   pokemonApi.endpoints.getPokemonByName.useQuery;

  //access the same hooks instead of importing theme:
  //query: const useGetPokemonByNameQuery = pokemonApi.endpoints.getPokemonByName.useQuery;
  //mutation: const useUpdatePokemonMutation = pokemonApi.endpoints.getUpdatePokemon.useMutation;

  //you can also use selector for Accessing cache data and request status // returns the query result object
//  const result = api.endpoints.getPosts.select()(state);
//  const { data, status, error } = result;

  //prefetching before you navigate to page eg when you hover over a menu item, next btn, link etc
  //use usePrefetch //don't run auto but returns a trigger fn that you can call

  const prefetchUser = usePrefetch("getUser"); //or define all options here prefetch("getUser", 4, {force: true, ifOlderThan..})//4 is url param for the endpoint query(id)

  //<button onMouseEnter={() => prefetchUser(4, { ifOlderThan: 35 })}>//ifOlderThan in sec checks if the last similar query time and current time is greater than it, if true prefetch//force: true overrides this.
  //<button onMouseEnter={() => prefetchUser(4, { force: true })}> //force forces refetching even when cache exists

  return (
    <div>
      {isLoading && "Loading"}
      {isSuccess && "Fetched"}
      <div>
        {error.status} {JSON.stringify(error.data)}
      </div>
    </div>
  );
};

export default Notes;
