import { useEffect, useCallback, useReducer } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' };

/**
 * This is not necesssary here
 * but we keep it this
 * way to mantain consistency
 */
interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

const reducer =
  <TData>() =>
  (state: State<TData>, action: Action<TData>): State<TData> => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { data: action.payload, loading: false, error: false };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: true };
      default:
        throw new Error();
    }
  };

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();

  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetchApi = useCallback(() => {
    const fetch = async () => {
      try {
        const { data, errors } = await server.fetch<TData>({ query });
        dispatch({ type: 'FETCH' });
        /**
         * Catch error from api when status 200
         */
        if (errors && errors.length) throw new Error(errors[0].message);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR' });
        throw console.error(e);
      }
    };

    fetch();
  }, [query]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return { ...state, refetch: fetchApi };
};
