import { BiCheckDouble } from "react-icons/bi";

function Chat({ message }) {
  return (
    <div className='ml-auto max-w-96 text-neutral-800 dark:text-neutral-200 shadow-lg text-sm bg-lime-200 dark:bg-lime-800 py-1 rounded-xl rounded-br-3xl rounded-tr-none dark:invert'>
      <div className='ms-4 me-8'>{message}</div>
      <div className="message-info flex justify-end items-center gap-1 mt-1 me-4">
        <div className="time ms-2 text-neutral-400 dark:text-neutral-300 text-xs">02:01</div>
        <BiCheckDouble className='text-cyan-300 text-lg' />
      </div>
    </div>
  )
}

export default Chat