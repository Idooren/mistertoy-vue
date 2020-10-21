import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService';

class Socket extends Component {
  state = {
    msg: { from: this.props.loggedInUser.username, txt: '' },
    msgs: [],
    topic: this.props.toy,
  };

  componentDidMount() {
    SocketService.setup();
    SocketService.emit('chat topic', '');
    SocketService.on('chat addMsg', this.addMsg);
  }

  componentWillUnmount() {
    SocketService.off('chat addMsg', this.addMsg);
    SocketService.terminate();
  }

  addMsg = (newMsg) => {
    this.setState((prevState) => ({ msgs: [...prevState.msgs, newMsg] }));
  };

  onChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value,
        },
      };
    });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    SocketService.emit('chat newMsg', this.state.msg.txt);
    this.setState({ msg: { from: this.props.loggedInUser.username, txt: '' } });
  };

  render() {
    return (
      <div className='card chat-container'>
        <div className='chat-card chat-messages' style={{ minHeight: '200px' }}>
          {this.state.msgs.map((msg, idx) => (
            <div class='message' key={idx}>
              <p class='meta'>
                {this.state.msg.from} <span>9:12pm</span>
              </p>
              <p class='text'>{msg}</p>
            </div>
          ))}
        </div>
        <form className='grid-2' onSubmit={this.onSubmit}>
          <input className='btn btn-primary' value='Send' type='submit' />
          <input
            type='text'
            value={this.state.msg.txt}
            onChange={this.onChange}
            name='txt'
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Socket);
