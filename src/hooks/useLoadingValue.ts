import { useReducer } from 'react';

type ReducerState<E> = {
	error?: E;
	loading: boolean;
	value?: any;
};

type LoadingAction = { type: 'loading' };
type ErrorAction<E> = { type: 'error'; error: E };
type ResetAction = { type: 'reset'; isLoadingByDefault: boolean };
type ValueAction = { type: 'value'; value: any };
type ReducerAction<E> = ErrorAction<E> | ResetAction | ValueAction | LoadingAction;

const defaultState = (isLoadingByDefault: boolean) => {
	return {
		error: undefined,
		loading: isLoadingByDefault,
		value: undefined,
	};
};

const reducer = <E>() => (state: ReducerState<E>, action: ReducerAction<E>): ReducerState<E> => {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				loading: true,
			};
		case 'error':
			return {
				...state,
				error: action.error,
				loading: false,
				value: undefined,
			};
		case 'reset':
			return defaultState(action.isLoadingByDefault);
		case 'value':
			return {
				...state,
				error: undefined,
				loading: false,
				value: action.value,
			};
		default:
			return state;
	}
};

const useLoadingValue = <T, E>(isLoadingByDefault: boolean = false) => {
	const [state, dispatch] = useReducer(reducer<E>(), defaultState(isLoadingByDefault));

	const reset = () => {
		dispatch({ type: 'reset', isLoadingByDefault: isLoadingByDefault });
	};

	const startLoading = () => {
		dispatch({ type: 'loading' });
	};

	const setError = (error: E) => {
		dispatch({ type: 'error', error });
	};

	const setValue = (value?: T | null) => {
		dispatch({ type: 'value', value });
	};

	return {
		error: state.error,
		loading: state.loading,
		value: state.value as T | null | undefined,
		reset,
		setError,
		startLoading,
		setValue,
	};
};

export default useLoadingValue;
