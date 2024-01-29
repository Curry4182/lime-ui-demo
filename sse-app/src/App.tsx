import React, { useState, useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import './App.css';

const App: React.FC = () => {
  
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);
  const [accessToken, setAccessToken] = useState<string>("null");
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const [sseUrl, setSseUrl] = useState<string>("");

  useEffect(() => {
    // 로컬 스토리지에서 sseUrl과 accessToken 불러오기
    const storedSseUrl = localStorage.getItem('sseUrl');
    const storedToken = localStorage.getItem('accessToken');

    if (storedSseUrl) {
      setSseUrl(storedSseUrl);
    }
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleSseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSseUrl(e.target.value);
    localStorage.setItem('sseUrl', e.target.value); // sseUrl 변경 시 로컬 스토리지에 저장
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('accessToken');
    const storedToken = localStorage.getItem('accessToken');

    const token = tokenFromUrl || storedToken;
    if (token) {
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
      connect(token);
    }
  }, []);

  const handleLogin = async () => {
      try {
          console.log(accessToken);
          setAccessToken(accessToken);
          connect(accessToken);
      } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error:', errorMessage);
        setMessage(`Error: ${errorMessage}`);
      }
  };

  const connect = (token: string) => {
      if (eventSource) {
        eventSource.close();
      }

      const newEventSource = new EventSourcePolyfill(sseUrl, {
         headers: { 'Authorization': `Bearer `+ token },
         heartbeatTimeout: 120000
        });

      newEventSource.onmessage = (event) => {
        const data = event.data;
        setMessages(prevMessages => [...prevMessages, `Received from ${sseUrl}: ${data}`]);
      };

      newEventSource.addEventListener("connect", event => {
        const messageEvent = event as MessageEvent;
        const msg = `EventType: ${event.type}, Data: ${messageEvent.data}`;
        console.log(msg);
        setMessage(msg);
      });

      setEventSource(newEventSource);
  };

  const handleDisconnect = async () => {
    if (eventSource && accessToken) {
        try {
            const response = await fetch('http://localhost:12427/api/sse/subscribe', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken
                }
            });

            if (response.status === 200) {
                setMessage('disconnected successfully');
                eventSource.close();
                setEventSource(null);
            } else {
                setMessage('failed to disconnect');
            }
        } catch (error) {
          const errorMessage = (error as Error).message;
          console.error('error:', errorMessage);
          setMessage(`error: ${errorMessage}`);
        }
    }
  };

  return (
    <div className="app-container">
        <input
          type="text"
          placeholder="SSE URL"
          value={sseUrl}
          onChange={handleSseUrlChange}
        />
        <div className="button-container">
          <button onClick={handleLogin} className="connect-button">Connect</button>
          <button onClick={handleDisconnect} disabled={!eventSource} className="disconnect-button">Disconnect</button>
        </div>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className="message">{message}</div>
          ))}
        </div>
    </div>
  );
};

export default App;
