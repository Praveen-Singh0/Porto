import { useEffect, useState, useCallback } from "react";

function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);

    try {
      const res = await fetcher();
      setData(res);
    } catch (err: any) {
      setError(err);
    } finally {
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  return {
    data,
    error,
    setData,
    refetch: fetchData,
  };
}

export default useFetch;
