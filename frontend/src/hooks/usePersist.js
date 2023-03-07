import { useState, useEffect } from "react";

const usePersist = () => {
  const persistItem = JSON.parse(localStorage.getItem("persist"));
  //default is true if first timer when localStorage has not been set=null//else use user preference
  const [persist, setPersist] = useState(
    persistItem !== null ? persistItem : true
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
