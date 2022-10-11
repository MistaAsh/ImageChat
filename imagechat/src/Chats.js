import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import Chat from './Chat';
import './Chats.css';
import { selectUser } from './features/appSlice';
import { resetCameraImage } from './features/cameraSlice';
import { auth, db } from './firebase';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => 
        setPosts(
          snapshot.docs.map(doc =>({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takePic = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className = "chats">
      <div className = "chats-header">
        <Avatar 
          src = {user.profilePic} 
          onClick = {() => auth.signOut()} 
          className = "chats-avatar" 
        />
        <div className = "chats-search">
          <SearchIcon className = "chats-searchicon"/>
          <input placeholder = "Friends" type = "text" />
        </div>
        <ChatBubbleIcon className = "chats-chaticon" />
      </div>

      <div className = "chats-posts">
        {posts.map(
          ({ id, data: {imageURL, isRead, profilePic, timestamp, username}, }) => (
            <Chat 
              key = {id}
              id = {id}
              imageURL = {imageURL}
              isRead = {isRead}
              profilePic = {profilePic}
              timestamp = {timestamp}
              username = {username}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon 
        className = "chats-takepicicon"
        onClick = {takePic}
        fontSize = "large"
      />
    </div>
  );
}

export default Chats;