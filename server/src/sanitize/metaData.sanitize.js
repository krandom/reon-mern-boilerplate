module.exports = ({ content, ...rest }) => {

    content = content.trim();

	return {
    content,
    ...rest
  };
};