import { useState, useEffect, useCallback, useRef } from 'react';
import { handleApiError, logError } from '../utils/errorHandler';

// Custom hook for API calls with loading, error, and retry functionality
export const useApi = (apiFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(...args);
      
      if (mountedRef.current) {
        setData(response);
      }
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      logError(err, 'useApi');
      
      if (mountedRef.current) {
        setError(errorMessage);
      }
      throw err;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [apiFunction]);

  const retry = useCallback((...args) => {
    return execute(...args);
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute, ...dependencies]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { data, loading, error, execute, retry };
};
