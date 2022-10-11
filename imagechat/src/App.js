import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import './App.css';
import WebCamera from './WebCamera';
import Preview from './Preview';
import Chats from './Chats'
import ChatView from './ChatView';
import Login from './Login';
import { selectUser, login, logout } from './features/appSlice';
import { auth } from './firebase';

TimeAgo.addDefaultLocale(en);

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, []);

  return (
    <div className = "app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            {/* <img className = "app-logo" src = "https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt = "" /> */}
            <div className = "app-body">
              <div className = "app-body-background">
                <Routes>
                  <Route path="/" element={ <WebCamera /> } />
                  <Route path="/preview" element={ <Preview /> } />
                  <Route path="chats" element={ <Chats /> } /> 
                  <Route path="chats/view" element={ <ChatView /> } />
                </Routes>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;