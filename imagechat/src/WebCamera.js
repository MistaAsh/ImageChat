import React from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
};

function WebCamera() {
  const camRef = React.useRef(null);
  return (
    <div className="camera">
      <Webcam 
        audio = {false}
        width = {videoConstraints.width}
        height = {videoConstraints.height}
        ref = {camRef}
        screenshotFormat = "image/jpeg"
        videoConstraints = {videoConstraints}
      />
    </div>
  )
}

export default WebCamera;