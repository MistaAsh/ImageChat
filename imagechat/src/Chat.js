import React from "react";
import { useDispatch } from "react-redux";
import ReactTimeAgo from 'react-time-ago';

import { Avatar } from "@mui/material";
import StopRoundedIcon from '@mui/icons-material/StopRounded';

import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";
import { useNavigate } from "react-router";

function Chat({ id, imageURL, isRead, profilePic, timestamp, username }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!isRead) {
      dispatch(selectImage(imageURL));
      db.collection('posts').doc(id).set(
        { isRead: true },
        { merge: true },
      );
      navigate('/chats/view');
    }
  };

  return (
    <div onClick = {open} className = "chat">
      <Avatar src = {profilePic} className = "chat-avatar" />
      <div className = "chat-details">
        <h4> {username} </h4>
        <p> {!isRead && "Tap to view -"} <ReactTimeAgo date = {new Date(timestamp?.toDate()).toUTCString()} /> </p>
      </div>
      {!isRead && <StopRoundedIcon className = "chat-readicon" />}
    </div>
  );
}

export default Chat;