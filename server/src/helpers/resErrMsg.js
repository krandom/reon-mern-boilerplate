const resErrMsg = ({
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
		type: 'info' || type,
		visible: visible || true,
	});
}

module.exports = resErrMsg;