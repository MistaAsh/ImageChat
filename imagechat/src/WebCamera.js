import React, { useCallback } from 'react';
import Webcam from "react-webcam";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DuoIcon from '@mui/icons-material/Duo';

import './WebCamera.css';
import { selectUser } from './features/appSlice';
import { setCameraImage } from './features/cameraSlice';
import { auth } from './firebase';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
};

function WebCamera() {
  const camRef = React.useRef(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate('/preview');
  }, [camRef]);

  const goToChat = () => {
    navigate('/chats');
  };

  return (
    <div className = "camera">
      <Webcam 
        audio = {false} 
        width = {videoConstraints.width}
        height = {videoConstraints.height}
        ref = {camRef}
        screenshotFormat = "image/jpeg"
        videoConstraints = {videoConstraints}
      />

      <div className = "camera-header">
        <Avatar 
          src = {user.profilePic}
          onClick = {() => auth.signOut()}
          className = "camera-avatar"
        />
        <div className = "camera-search">
          <SearchIcon className = "camera-searchicon" />
          <input placeholder = "Search" type = "text" />
          <PersonAddIcon className = "camera-addicon" />
        </div>
        <FlipCameraIosIcon
          className = "camera-flipicon"
        />
      </div>

      <div className = "camera-footer">
        <ChatBubbleIcon className = "camera-chaticon" onClick = {goToChat} />
        <RadioButtonUncheckedIcon 
          className = "camera-button"
          onClick = {capture}
          fontSize = "large"
        />
        <DuoIcon className = "camera-videoicon" />
      </div>
    </div>
  );
}

export default WebCamera;