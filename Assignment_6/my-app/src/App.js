import logo from './logo.svg';
import app from './App.css';
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  function increaseCount() {
    setCount(count + 1);
  }
  return (
    <div>
      <h1>Count  {count}</h1>
      <button onClick={increaseCount}>Increase</button>
    </div>
  );
}
export default App;