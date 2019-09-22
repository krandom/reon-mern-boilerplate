import * as NotificationActions from '../../actions/Notification.actions';

class Toast extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     uuid : uuid(),
        //     showAdditionalInfo : false,
        //     confirmClose : false,
        // };

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

        const { ID, NotificationActions } = this.props;

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
                NotificationActions.hideToast(ID);
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

        return ([
            <div className='toast' id={ID}>
                <div className={`toast__content toast__content--${type}`}>

                    {message}
                </div>
            </div>
        ]);
    }
}

const mdtp = dispatch => ({
    NotificationActions: Redux.bindActionCreators(NotificationActions, dispatch),
});

export default ReactRedux.connect(null, mdtp)(Toast);