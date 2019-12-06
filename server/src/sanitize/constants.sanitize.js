module.exports = ({ app, description, key, name, value, ...rest }) => {

    app = app.trim();
    description = description.trim();
    key = key.trim();
    name = name.trim();
    value = value.toLowerCase();

    if (app.length === 0) app = null;
    if (description.length === 0) description = null;
    if (key.length === 0) key = null;

	return {
    app,
    description,
    key,
    name,
    value,
    ...rest
  };
};