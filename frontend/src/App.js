import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [content, setContent] = useState(0);

  useEffect(() => {
    console.log(process.env);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then(res => setContent(res.data))
  }, [])

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
