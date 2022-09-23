import { useCallback } from 'react';
import useLoadingValue from './useLoadingValue';

export function useCustomAsync<T, E = Error>() {
	// The execute function wraps asyncFunction and
	// handles setting state for pending, value, and error.
	// useCallback ensures the below useEffect is not called
	// on every render, but only if asyncFunction changes.
	const { value, loading, error, setValue, setError, startLoading, reset } = useLoadingValue<T, E>(
		false
	);

	const execute = useCallback((asyncFunction: () => Promise<T>) => {
		// Should we reset between calls?
		reset();
		startLoading();
		return asyncFunction()
			.then((response: T) => setValue(response))
			.catch((error: E) => {
				console.error(error);
				setError(error);
			});
	}, []);

	return { execute, value, loading, error };
}
