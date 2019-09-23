import { connect } from 'react-redux';
import { popupActionArr } from '../../reducers/app.reducer';

class ModalWindow extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div className='fullscreen'>
        {children}
      </div>
    );
  }
}

// const mdtp = {
//     popupActions: popupActionArr,
// };

export default connect(null, null)(ModalWindow);