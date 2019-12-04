module.exports = ({ app, description, key, name, value, ...rest }) => {

	if (key.length === 0) key = null;
	if (description.length === 0) description = null;
	if (app.length === 0) app = null;

	value = value.toLowerCase();
	name = name.trim();

	return {
    key,
    description,
    app,
    value,
    name,
    ...rest
  };
};