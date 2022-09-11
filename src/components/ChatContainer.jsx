import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './Chatinput';
import { v4 as uuidv4 } from 'uuid';


export default function ChatContainer({ currentChat, currentUser, setCurrentUser }) {

  const [messages, setMessages] = useState([]);


  useEffect(() => {
    async function fetchData() {
      setMessages(currentChat.messages)
      console.log("currentChat.messages[0]", currentChat.messages)
    }
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    console.log("handleSendMsg", msg, currentUser.email, currentChat.email)

    var lastMsg = messages[messages.length - 1]
    var msgList = messages

    lastMsg["admin"] = msg
    console.log("lastmsg", lastMsg)
    msgList.pop()
    msgList.push(lastMsg)
    console.log("msgList", msgList)

    fetch('http://localhost:8002/sendMsg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentChat.email, messages: msgList })
    })
      .then(response => response.json())
      .then(data => {
        console.log("updated data", data)
        setCurrentUser({
          "_id": 1,
          "name": "admin",
          "avatarImage": "https://cdn-icons-png.flaticon.com/512/194/194938.png",
          "email": "admin123@gmail.com"
        });
      }
      );


  }

  return (
    <Container><div className='chat-header'>
      <div className='user-details'>
        <div className='avatar'>
          <img
            src='https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png'
            alt="avatar"
          />
        </div>
        <div className='name'>
          <h3>{currentChat.name}</h3>

        </div>

      </div>
    </div>
      <div className='chat-messages' >

        {messages.map((message) => {
          return (
            <div key={uuidv4()}>
              <div className={`message recieved`}>
                <div className='content'>
                  <p>
                    {message.user}
                  </p>
                </div>
              </div>
              <div className={`message sended`}>
                <div className='content'>
                  <p>
                    {message.admin}
                  </p>
                </div>
              </div>
            </div>)
        })}


      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .name {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
  
`;