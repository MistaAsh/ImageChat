import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./ChatView.css";
import { selectSelectedImage } from "./features/appSlice";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  const onLoad = () => {
    setLoaded(true);
  }

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    navigate("/chats", { replace: true });
  };

  return (
    <div className = "chatview">
      <img ref={ref} onLoad={onLoad} src={selectedImage} onClick={exit} alt = "" />
      { loaded ?
      <div className = "chatview-timer">
        <CountdownCircleTimer
          isPlaying
          duration = {10}
          strokeWidth = {4}
          size = {40}
          colors = {["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime = {[10, 6, 3, 0]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div> : <div>
        <h1>Loading...</h1>
        </div> }
    </div>
  );
}

export default ChatView;