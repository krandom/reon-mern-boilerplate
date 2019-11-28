const add = ({
	icon,
	message,
	pauseOnHover,
	showNotification,
	sticky,
	timer,
	type,
	visible,
}) => {
	return ({
		icon: icon || null,
		message,
		pauseOnHover: pauseOnHover || true,
		showNotification: showNotification || true,
		sticky: sticky || false,
		timer: timer || 5000,
		type: type || 'info',
		visible: visible || true,
	});
}

const warn = (payload) => {
	return add({ ...payload, type: 'warning' });
}

module.exports = {
	add: add,
	warn: warn,
};