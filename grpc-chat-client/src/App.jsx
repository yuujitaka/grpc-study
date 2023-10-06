import { useState, useRef } from 'react';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import { User, JoinResponse } from './chat_pb';
import { ChatServiceClient } from './chat_grpc_web_pb';

const client = new ChatServiceClient('http://localhost:8080', null, null);

function App() {
  const inputRef = useRef(null);
  const [submitted, setSubmitted] = useState(null);

  function joinHandler() {
    const _username = inputRef.current.value;

    const user = new User();
    user.setId(Date.now());
    user.setName(_username);

    client.join(user, null, (err, response) => {
      if (err) return console.log(err);
      const error = response.getError();
      const msg = response.getMsg();

      if (error === 1) {
        setSubmitted(true);
        return;
      }
      window.localStorage.setItem('username', _username.toString());
      setSubmitted(true);
    });
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
    <>
      <head>
        <title>ChatApp</title>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <Header />
      <div className='container'>
        <main className='main'>
          {submitted ? renderChatPage() : renderJoinPage()}
        </main>
      </div>
    </>
  );
}

export default App;
