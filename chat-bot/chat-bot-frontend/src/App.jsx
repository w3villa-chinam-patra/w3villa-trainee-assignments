import { useState } from "react";
import Chats from "./components/Chats"
import Contacts from "./components/Contacts"

function App() {
const [index,setIndex] = useState(null);
  return (
    <div className="grid grid-cols-[300px_auto] h-screen">
      <Contacts setIndex={setIndex}/>
      <Chats index={index} />
    </div>
  )
}

export default App
