import React, { useEffect } from 'react';
import { useState } from 'react';
import InputField from './InputField';
// import socket from '../../api/chat/server';
import MessageContainer from './MessageContainer';
const Room = () => {
  // const [message, setMessage] = useState('');
  // const [messageList, setMessageList] = useState([]);
  // useEffect(() => {
  //   socket.on('message', message => {
  //     setMessageList(prevState => prevState.concat(message));
  //     console.log('res', message);
  //   });
  // }, []);
  // const sendMessage = event => {
  //   event.preventDefault();
  //   socket.emit('sendMessage'.message, res => {
  //     console.log('sendMessage res', res);
  //   });
  // };
  return (
    <div>
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Room;
