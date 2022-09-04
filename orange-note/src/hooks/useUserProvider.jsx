import { useState } from "react";

function useUserProvider() {
  const [currentStudy, setCurrentStudy] = useState({});
  return {
    currentStudy, setCurrentStudy,
  };
}

export default useUserProvider;
