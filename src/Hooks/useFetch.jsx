import { useState, useCallback, useRef } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetchApi = () => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [error, setError] = useState(null);

  const abortControllers = useRef([]);

  const fetchApi = useCallback(
    async (endPoint, method = "GET", payload = null) => {
      const controller = new AbortController();
      abortControllers.current.push(controller);

      setLoadingCount((c) => c + 1);
      setError(null);

      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      };

      if (method !== "GET" && payload) {
        options.body = JSON.stringify(payload);
      }

      try {
        const response = await fetch(`${BASE_URL}${endPoint}`, options);

        if (!response.ok) {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");

          const errorMessage = isJson
            ? (await response.json())?.message
            : await response.text();

          throw Object.assign(new Error(errorMessage), {
            status: response.status,
          });
        }

        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        return {
          status: response.status,
          ...(await response.json()),
        };
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }

        return {
          status: err.status || 500,
          message: err.message || "Request failed",
        };
      } finally {
        setLoadingCount((c) => c - 1);
      }
    },
    [],
  );

  const cancelAll = () => {
    abortControllers.current.forEach((c) => c.abort());
    abortControllers.current = [];
  };

  return {
    fetchApi,
    loading: loadingCount > 0,
    error,
    cancelAll,
  };
};

export default useFetchApi;
