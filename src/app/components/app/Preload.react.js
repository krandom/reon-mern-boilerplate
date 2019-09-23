import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Preload = ({ booted }) => {

	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (booted) {
			$('.preload').css({ opacity: 0 });

			setTimeout(() => {
				setVisible(false);
			}, 500)
		}
	}, [booted])

	if (!visible)
		return null;

	return (
		<div className='preload' />
	);
};

const mstp = s => ({
	booted: s.app.booted,
});

export default connect(mstp, null)(Preload);