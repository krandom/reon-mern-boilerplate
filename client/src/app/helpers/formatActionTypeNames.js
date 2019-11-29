export default (obj, prefix) => {
	Object.keys(obj).forEach(x => {
		obj[x] = `${prefix}/${x}`;
	});

	return obj;
};
