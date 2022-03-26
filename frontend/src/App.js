import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [content, setContent] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8082/')
      .then(res => setContent(res.data))
  }, [])

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
