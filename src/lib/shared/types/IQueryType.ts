export const queryTypes = ['tracks', 'artists'] as const;
export type IQueryType = typeof queryTypes[number];

export const formatQueryType = (type: IQueryType) => {
	if (type === 'tracks') return 'Tracks';
	if (type === 'artists') return 'Artists';
	return 'Artists';
};
