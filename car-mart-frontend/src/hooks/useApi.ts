// src/hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: UseApiOptions = {}
) => {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiFunction(...args);
      
      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null
        });
        onSuccess?.(response.data);
        return response.data;
      } else {
        const errorMessage = response.message || 'An error occurred';
        setState({
          data: null,
          loading: false,
          error: errorMessage
        });
        onError?.(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });
      onError?.(errorMessage);
      throw error;
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset
  };
};