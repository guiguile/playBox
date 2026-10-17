import { useState } from "react";

export default function App() {
  const [count, setCount]=useState(0);

  return (
    <>
      <h1>Hello, I'm Tim!</h1>
      <h2>Olen opiskelja</h2>
      <h3>This is my second year in Finland.</h3>
      <ul> Part of my to-do list:
        <li><a href="">review on JAVA and JS</a></li>
        <li>data structure and network technology study</li>
        <li>Finnish language study</li>
      </ul>
      <button type="button" id="lMe" onClick={()=>setCount(count+1)}>like me</button>
      <p>likes: {count}</p>
    
    
    </> 
  )
}