import { connect} from 'react-redux';
import { notificationActions } from '../../reducers/notification.reducer';

class Toast extends React.Component {

    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
    }

    componentDidMount() {
        var self = this;

        const { sticky, timer, } = this.props;

        if (!sticky)
            setTimeout(() => {
                self.close(false);
            }, timer);
    }

    close(e) {
        var self = this;

        const { ID, removeToastAction } = this.props;

        $(`#${ID} .toast__content`).css({
            'left' : '400px',
            'opacity' : 0
        });

        $(`#${ID}`).css({
            'height' : parseInt($(`#${ID}`).css('height')),
        });

        setTimeout(() => {
            $(`#${ID}`).css({
                'height'      : 0,
                'padding-top' : 0
            });

            setTimeout(() => {
                removeToastAction(ID);
            }, 400);
        }, 400);
    }

    render() {
        var self = this;

        const {
            ID,
            message,
            sticky,
            timer,
            type,
            visible,
        } = this.props;

        let icon = '';
        switch (type)
        {
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

        return ([
            <div className='toast' id={ID}>
                <div className={`toast__content toast__content--${type}`}>
                    <div className='toast__icon'>
                        <i className={`fa fa-${icon}`} />
                    </div>

                    <div className='toast__text'>
                        {message}
                    </div>

                    <div
                        className='toast__close'
                        onClick={() => { this.close(); }}>

                        <i className="fa fa-times"></i>
                    </div>
                </div>
            </div>
        ]);
    }
}

const mdtp = {
    removeToastAction: notificationActions.removeToast,
};

export default connect(null, mdtp)(Toast);