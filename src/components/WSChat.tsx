import React, { useState, useEffect } from 'react';

// Интерфейс для сообщения
interface Message {
  sender: string;
  message: string;
}

const WSChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false); // Флаг авторизации
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Подключение к серверу WebSocket
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        const newMessage: Message = {
          sender: data.sender,
          message: data.message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (data.type === 'auth') {
        if (data.success) {
          setIsAuthorized(true);
          console.log('Authorization successful!');
        } else {
          console.error('Authorization failed.');
        }
      } else if (data.type === 'register') {
        if (data.success) {
          console.log('Registration successful!');
        } else {
          console.error(`Registration failed: ${data.error}`);
        }
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  // Функция для авторизации
  const handleAuth = () => {
    if (socket) {
      const authMessage = {
        type: 'auth',
        username: userName,
        password: password,
      };
      socket.send(JSON.stringify(authMessage));
    }
  };

  // Функция для регистрации нового пользователя
  const handleRegister = () => {
    if (socket) {
      const registerMessage = {
        type: 'register',
        username: userName,
        password: password,
      };
      socket.send(JSON.stringify(registerMessage));
    }
  };

  // Отправка сообщения
  const sendMessage = () => {
    if (socket && isAuthorized) {
      const newMessage = {
        type: 'message',
        message: input,
      };
      socket.send(JSON.stringify(newMessage));
      setInput(''); // Очищаем поле ввода
    } else {
      console.error('You must be authorized to send messages.');
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>

      {/* Форма авторизации и регистрации */}
      {!isAuthorized && (
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleAuth}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}

      {/* Чат */}
      {isAuthorized && (
        <>
          <div className="message-list">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <div className="chat-profile"><div className="avatar"></div><strong>{message.sender}</strong></div><div> {message.message}</div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message"
          />
          <button onClick={sendMessage}>Send</button>
        </>
      )}
    </div>
  );
};

export default WSChat;
