import { useState, useRef } from 'react';
import './App.css';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

import { User } from './proto/chat';
import { ChatServiceClient } from './proto/chat.client';
import ChatPage from './pages/ChatPage';

const transport = new GrpcWebFetchTransport({
  baseUrl: 'http://localhost:8080',
});

const client = new ChatServiceClient(transport);

function App() {
  const inputRef = useRef<HTMLInputElement>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  async function joinHandler() {
    const _username = inputRef.current?.value ?? '';

    const user: User = { id: Date.now().toString(), name: _username };

    const { response } = await client.join(user);

    if (response.error === 0) {
      setSubmitted(true);
      window.localStorage.setItem('username', _username.toString());
    } else {
      setSubmitted(true);
      return;
    }
  }

  function renderChatPage() {
    return <ChatPage client={client} />;
  }

  function renderJoinPage() {
    return (
      <div>
        <div>
          <h1>Join Chat As...</h1>
        </div>
        <div style={{ padding: '10px 0' }}>
          <input
            style={{ fontSize: '1.3rem' }}
            type='text'
            ref={inputRef}
            placeholder='Your username...'
          />
        </div>
        <div>
          <button
            onClick={joinHandler}
            style={{
              padding: '7px 38px',
              fontSize: '1.2em',
              boxSizing: 'content-box',
              borderRadius: '4px',
            }}
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <main className='main'>
        {submitted ? renderChatPage() : renderJoinPage()}
      </main>
    </div>
  );
}

export default App;
