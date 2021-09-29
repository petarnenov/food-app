import { useState, useCallback } from "react";

export const useHTTP = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const sendRequest = useCallback(async (input, init) => {
    setIsLoading(true);
    await fetch(input, init)
      .then((res) => {
        if (!res.ok) throw Error(`Fetch failed with status code ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setError(null);
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return [error, data, isLoading, sendRequest];
};
