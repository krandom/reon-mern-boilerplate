import { connect } from 'react-redux';
import { notificationActions } from '../../reducers/notification.reducer';

class Toast extends React.Component {
	constructor(props) {
		super(props);

		this.close = this.close.bind(this);
	}

	componentDidMount() {
		var self = this;

		const { sticky, timer } = this.props;

		if (!sticky)
			setTimeout(() => {
				self.close(false);
			}, timer);
	}

	close() {
		const { id, removeToastAction } = this.props;

		$(`#${id} .toast__content`).css({
			left: '400px',
			opacity: 0,
		});

		$(`#${id}`).css({
			height: parseInt($(`#${id}`).css('height')),
		});

		setTimeout(() => {
			$(`#${id}`).css({
				height: 0,
				'padding-top': 0,
			});

			setTimeout(() => {
				removeToastAction(id);
			}, 400);
		}, 400);
	}

	render() {
		const { id, message, type } = this.props;

		let icon = '';
		switch (type) {
			case 'warning':
				icon = 'exclamation-triangle';
				break;

			case 'info':
				icon = 'info';
				break;

			case 'error':
				icon = 'bomb';
				break;

			default:
				icon = 'check';
		}

		return (
			<div className="toast" id={id}>
				<div className={`toast__content toast__content--${type}`}>
					<div className="toast__icon">
						<i className={`fa fa-${icon}`} />
					</div>

					<div className="toast__text">{message}</div>

					<div
						className="toast__close"
						onClick={() => {
							this.close();
						}}
					>
						<i className="fa fa-times"></i>
					</div>
				</div>
			</div>
		);
	}
}

const mdtp = {
	removeToastAction: notificationActions.removeToast,
};

export default connect(null, mdtp)(Toast);
