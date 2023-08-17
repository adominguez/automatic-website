import { useState, useEffect } from 'react';

export const useFetchApi = ({ endpoint }) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, meta } = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/${endpoint}`).then(res => res.json());
      if (!data?.length) {
        setEmpty(true);
        setResponse([]);
      } else {
        setEmpty(false);
        setResponse({ data, meta });
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { response, error, loading, isEmpty, loadData };
};