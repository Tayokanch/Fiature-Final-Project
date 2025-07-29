import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useFetch = (url, options = {}, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.request({ url, ...options });
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options), ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}; 