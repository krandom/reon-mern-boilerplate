import { useEffect } from 'react';

export default (id, onClickOutside, exceptionId) => {
	useEffect(() => {
		const listener = e => {
			if ($(e.target).closest(`#${id},#${exceptionId}`).length === 0)
				onClickOutside();
		};

		$(document).on('click', listener);

		return () => $(document).off('click', listener);
	}, []);
};