import { useState } from 'react';

const Label = ({
	className = null,
	label = null,
	info = null,
	required = false,
}) => {
	const [showInfo, setShowInfo] = useState(false);
	const [forceOpen, setForceOpen] = useState(false);

	return (
		<div className={`label-text ${className}`}>
			<span>
				{label}
				{ required && <b>*</b> }
			</span>

			{ info &&
				<div
					className={`label-text__info ${forceOpen && 'blue'}`}
					onMouseEnter={() => {
						if (forceOpen)
							return;

						setShowInfo(true);
					}}
					onMouseLeave={() => {
						if (forceOpen)
							return;

						setShowInfo(false);
					}}
					onClick={() => setForceOpen(!forceOpen) }
				>
					<fa className='fa fa-info-circle' />
					{ (forceOpen || showInfo) &&
						<div
							className='label-text__info--bubble'
							dangerouslySetInnerHTML={{ __html: info }}
						/>
					}
				</div>
			}
		</div>
	);
};

export default Label;
