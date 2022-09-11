import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import socketIOClient from "socket.io-client";

function Chat() {
  const socket = useRef();
  const mysocket = socketIOClient("http://localhost:8002", { transports : ['websocket'] });
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {

    // make connection with server from user side
    mysocket.on('connect', function(){
  console.log('Connected to Server')
  
 
});

    async function fetchData() {
      setCurrentUser({
        "_id": 1,
        "name": "admin",
        "avatarImage": "https://cdn-icons-png.flaticon.com/512/194/194938.png",
        "email": "admin123@gmail.com"
      });
    }
    fetchData();
    return () => mysocket.disconnect();
  }, []);

  // get all chats contacts and details
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        fetch('http://localhost:8002/AllChats')
          .then(response => response.json())
          .then(data => setContacts(data));
      }
    }
    fetchData();
  }, [currentUser]);

  // get current chat
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
    console.log(chat, "chatttttttttttt")
  }

  return (<>
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />


        {
          currentChat === undefined ? <Welcome currentUser={currentUser} /> :
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} setCurrentUser={setCurrentUser} />
        }
      </div>

    </Container>
  </>
  )
}

const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat