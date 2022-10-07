import { BrowserRouter, Routes, Route } from 'react-router-dom';

import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';

import './App.css';
import WebCamera from './WebCamera';
import Preview from './Preview';
import Chats from './Chats'

TimeAgo.addDefaultLocale(en);

function App() {
  return (
    <div className = "app">
      <BrowserRouter>
        <div className = "app-body">
          <Routes>
            <Route path="/" element={ <WebCamera /> } />
            <Route path="/preview" element={ <Preview /> } />
            <Route path="chats" element={ <Chats /> } /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;