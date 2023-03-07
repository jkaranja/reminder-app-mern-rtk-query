import { useEffect } from "react"
import { useDispatch } from "react-redux"
let api = ''//create api slice
export function usePrefetchImmediately(
  endpoint,
  arg,
  options = {}
) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(api.util.prefetch(endpoint, arg, options))
  }, [])
}

// In a component
//usePrefetchImmediately('getUser', 5)