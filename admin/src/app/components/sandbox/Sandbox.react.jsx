import { connect } from 'react-redux';

const Sandbox = () => {
	return (
		<div className='page'>
			<div className='page__content'>

			</div>
		</div>
	);
};

const mstp = s => ({
	// state: s,
});

const mdtp = {
	// addToastAction: notificationActions.addToast,
	// addSidebarPageAction: sidebarActions.addPage,
	// addModalAction: modalActions.add,
	// toggleHamburgerMenuAction: appActions.toggleHamburgerMenu,
	// getExchangeRatesAction: sandboxActions.getExchangeRates,
	// signupAction: authActions.signup,
	// loginAction: authActions.login,
};

export default connect(mstp, mdtp)(Sandbox);
