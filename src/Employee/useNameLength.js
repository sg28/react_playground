import { useState, useEffect } from "react";

const useNameLength = (name) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (name) {
      setLength(name.length);
    } else {
      setLength(0);
    }
  }, [name]);

  return length;
};

export default useNameLength;
