import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpCleint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);

  const activeHttpRequest = useRef([]);

  const sendRequset = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequest.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const data = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        return data;
      } catch (error) {
        setIsError(true);
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );
  const errorHandler = () => {
    setError(null);
    setIsError(false);
  };
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((ac) => ac.abort());
    };
  }, []);
  return { isLoading, isError, error, sendRequset, errorHandler, setIsError };
};
