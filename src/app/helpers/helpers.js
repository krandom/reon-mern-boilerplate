export const uniqueArr = (arr) => {
	return (
		_.map(
			_.uniq(
			    _.map(arr, x => JSON.stringify(x))
			), y => JSON.parse(y)
		)
	)
}

export const formatAsPrice = val => {
	return parseFloat(val).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}