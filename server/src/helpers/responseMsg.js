const add = ({
	icon = null,
	message,
	pauseOnHover = null,
	showNotification = null,
	sticky = null,
	timer = null,
	type = null,
	visible = null,
}) => {
	let returnObj = {
		message,
	};

	if (icon)
		returnObj.icon = icon;

	if (pauseOnHover)
		returnObj.pauseOnHover = pauseOnHover;

	if (showNotification)
		returnObj.showNotification = showNotification;

	if (sticky)
		returnObj.sticky = sticky;

	if (timer)
		returnObj.timer = timer;

	if (type)
		returnObj.type = type;

	if (visible)
		returnObj.visible = visible;

	return returnObj;
}

const info = (payload) => add({ ...payload, type: 'info' })
const warn = (payload) => add({ ...payload, type: 'warning' })


module.exports = {
	add: add,
	info: info,
	warn: warn,
};