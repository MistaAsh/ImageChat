import React, { useState, useEffect } from 'react';
import { db } from './firebase';

import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import Chat from './Chat';
import './Chats.css';

function Chats() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className = "chats">
      <div className = "chats-header">
        <Avatar className = "chats-avatar" />
        <div className = "chats-search">
          <SearchIcon />
          <input placeholder = "Friends" type = "text" />
        </div>
        <ChatBubbleIcon className = "chats-icon" />
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
    </div>
  );
}

export default Chats;