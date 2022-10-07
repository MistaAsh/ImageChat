import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import './Preview.css';
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

  return (
    <div className = "preview">
      <CloseIcon onClick = {closePreview} className = "preview_close" />
      <img src = {cameraImage}/>
    </div>
  );
}

export default Preview;