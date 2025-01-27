import { useEffect, useState } from "react";
import Chats from "./components/Chats"
import Contacts from "./components/Contacts"

function App() {
  const [index, setIndex] = useState(null);
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("isDark")) || false);
  return (
    <div className={`grid grid-cols-[300px_auto] h-screen ${isDark ? "dark" : ""}`}>
      <Contacts setIndex={setIndex} index={index} setIsDark={setIsDark} />
      <Chats index={index} isDark={isDark} />
    </div>
  )
}

export default App
