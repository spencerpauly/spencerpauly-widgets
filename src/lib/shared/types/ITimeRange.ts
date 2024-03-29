export const timeRanges = ['short_term', 'medium_term', 'long_term'] as const;
export type ITimeRange = typeof timeRanges[number];

export const formatTimeRange = (type: ITimeRange) => {
	if (type === 'short_term') return 'Month';
	if (type === 'medium_term') return '6 Months';
	if (type === 'long_term') return '2+ Years';
	return '2+ Years';
};

export const formatTimeRangeExplicit = (type: ITimeRange) => {
	if (type === 'short_term') return 'Short Term';
	if (type === 'medium_term') return 'Medium Term';
	if (type === 'long_term') return 'Long Term';
	return 'Long Term';
};
