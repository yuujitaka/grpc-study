import Chat from '../../components/Chat';
import UsersList from '../../components/UsersList';
import './ChatPage.css';
import { ChatMessage, ReceiveMsgRequest, Empty } from '../../proto/chat_pb';
import { useEffect, useState } from 'react';

export default function ChatPage({ client }: any) {
  const [users, setUsers] = useState([]);
  const [msgList, setMsgList] = useState<any>([]);
  const username = window.localStorage.getItem('username');
  console.log(msgList);

  useEffect(() => {
    const strRq = new ReceiveMsgRequest();
    strRq.setUser(username as string);

    const chatStream = client.receiveMsg(strRq, {});

    chatStream.on('data', (response: any) => {
      const from = response.getFrom();
      const msg = response.getMsg();
      const time = response.getTime();
      console.log('data', response);

      if (from === username) {
        setMsgList((oldArray: any) => [
          ...oldArray,
          { from, msg, time, mine: true },
        ]);
      } else {
        setMsgList((oldArray: any) => [...oldArray, { from, msg, time }]);
      }
    });

    chatStream.on('status', function (status: any) {
      console.log('status', status.code, status.details, status.metadata);
    });

    chatStream.on('end', () => {
      console.log('Stream ended.');
    });
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    client.getAllUsers(new Empty(), null, (err: any, response: any) => {
      let usersList = response?.getUsersList() || [];
      usersList = usersList
        .map((user: any) => {
          return {
            id: user.array[0],
            name: user.array[1],
          };
        })
        .filter((u: any) => u.name !== username);
      setUsers(usersList);
    });
  }

  function sendMessage(message: any) {
    const msg = new ChatMessage();
    msg.setMsg(message);
    msg.setFrom(username as string);
    msg.setTime(new Date().toLocaleString());

    client.sendMsg(msg, null, (err: any, response: any) => {
      console.log(response);
    });
  }

  return (
    <div className='chatpage'>
      <div className='userslist-section'>
        <div
          style={{ paddingBottom: '4px', borderBottom: '1px solid darkgray' }}
        >
          <div>
            <button onClick={getAllUsers}>REFRESH</button>
          </div>
          <div>
            <span>
              Logged in as <b>{username}</b>
            </span>
          </div>
        </div>
        <UsersList users={users} />
      </div>
      <div className='chatpage-section'>
        <Chat msgList={msgList} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
