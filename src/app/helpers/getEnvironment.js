export default () => {

	if (window.location.href.includes('localhost'))
		return 'dev';

	return 'dev';
}