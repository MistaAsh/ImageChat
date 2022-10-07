import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import TextFieldsIcon from '@mui/icons-material/TextFields';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import CropIcon from '@mui/icons-material/Crop';
import NoteIcon from '@mui/icons-material/Note';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import './Preview.css';
import { db, storage } from './firebase';
import { selectCameraImage, resetCameraImage } from './features/cameraSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      navigate('/', { replace: true }); 
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage())
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error); 
      },
      () => {
        storage.ref('posts').child(id).getDownloadURL().then((url) => {
          db.collection('posts').add({
            imageURL: url,
            username: 'Test',
            isRead: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          navigate('/chats', { replace: true });
        });
      }
    );
  };

  return (
    <div className = "preview">
      <CloseIcon onClick = {closePreview} className = "preview-close" />
      <div className = "preview-toolbar-right">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <CropIcon />
        <AttachFileIcon />
      </div>
      <img src = {cameraImage} alt = "" />
      <div className = "preview-footer" onClick = {sendPost}>
        <h2> Send </h2>
        <SendIcon fontSize = "small" className = "preview-send-icon" />
      </div>
    </div>
  );
}

export default Preview;