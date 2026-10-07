import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  return (
    <div>
      <br>
      </br>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <h1>{text}</h1>
    </div>
  );
}
export default App;