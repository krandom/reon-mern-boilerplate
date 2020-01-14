import { useSelector } from 'react-redux';
import isFeatureEnabled from '../isFeatureEnabled';

// TODO :: make function that returns object
// const { ffLogin, ffSignup } = useFeatureFlags({ 'login', 'signup' });

export default (flag) => {
	const featureFlags = useSelector(s => s.app.featureFlags);

	return isFeatureEnabled(flag);
};
