import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import WebCamera from './WebCamera';
import Preview from './Preview';

function App() {
  return (
    <div className = "app">
      <BrowserRouter>
        <div className = "app_body">
          <Routes>
            <Route path="/" element={ <WebCamera /> } />
            <Route path="/preview" element={ <Preview /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;