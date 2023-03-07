import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiSlice } from "../app/apiSlice";

export function usePrefetchOnMount(endpoint, arg, options = {force:true}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiSlice.util.prefetch(endpoint, arg, options));
  }, []);
}

// In a component
//usePrefetchImmediately('getUser', 5)
