import React from 'react';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }


  render() {
    const { id, type, text } = this.props.message;
    return (
      <div className="notification is-success" className={classnames('notification', {'is-success': type})}>
        <button onClick={this.onClick} className="delete"></button>
        {text}
      </div>
    );
  }
}

export default FlashMessage;