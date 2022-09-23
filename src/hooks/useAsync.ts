import { useCallback, useEffect } from 'react';
import useLoadingValue from './useLoadingValue';

export function useAsync<T, E = Error>(asyncFunction: () => Promise<T>, isImmediate: boolean) {
	// The execute function wraps asyncFunction and
	// handles setting state for pending, value, and error.
	// useCallback ensures the below useEffect is not called
	// on every render, but only if asyncFunction changes.
	const { value, loading, error, setValue, setError, startLoading, reset } = useLoadingValue<T, E>(
		isImmediate
	);

	const execute = useCallback(() => {
		// Should we reset between calls?
		reset();
		startLoading();
		return asyncFunction()
			.then((response: T) => setValue(response))
			.catch((error: E) => {
				console.error(error);
				setError(error);
			});
	}, [asyncFunction]);

	// Call execute if we want to fire it right away.
	// Otherwise execute can be called later, such as
	// in an onClick handler.
	useEffect(() => {
		if (isImmediate) {
			execute();
		}
	}, []);
	return { execute, value, loading, error };
}
