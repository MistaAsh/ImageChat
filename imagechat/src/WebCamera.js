import React, { useCallback } from 'react';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCameraImage } from './features/cameraSlice';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
};

function WebCamera() {
  const camRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate.push('/preview');
  }, [camRef]);

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

      <RadioButtonUncheckedIcon
        className = "camera-button"
        onClick = {capture}
        fontsize = "large"
      />
    </div>
  );
}

export default WebCamera;