import Chat from './../../components/Chat';
import UsersList from './../../components/UsersList';
import './ChatPage.css';
import { ChatServiceClient } from '../../proto/chat.client';
import { ChatMessage, User } from '../../proto/chat';
import { useEffect, useState } from 'react';

type IProps = {
  client: ChatServiceClient;
};
export default function ChatPage({ client }: IProps) {
  const [users, setUsers] = useState<User[]>();
  const [msgList, setMsgList] = useState<ChatMessage[]>([]);
  const username = window.localStorage.getItem('username');

  const listenForMessages = async () => {
    const stream = client.receiveMsg({});
    for await (const message of stream.responses) {
      setMsgList([...msgList, message]);
    }
  };

  useEffect(() => {
    listenForMessages();
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const { response } = await client.getAllUsers({});
    setUsers(response.users);
  }

  async function sendMessage(message: string) {
    const msg: ChatMessage = {
      msg: message,
      from: username || '',
      time: new Date().toLocaleString(),
    };

    await client.sendMsg(msg);
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
