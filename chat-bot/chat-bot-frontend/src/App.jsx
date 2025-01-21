import Chats from "./components/Chats"
import Contacts from "./components/Contacts"

function App() {

  return (
    <div className="grid grid-cols-[300px_auto] h-screen">
      <Contacts/>
      <Chats />
    </div>
  )
}

export default App
