import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function useUser() {
  return useContext(UserContext);
}

export default useUser;
