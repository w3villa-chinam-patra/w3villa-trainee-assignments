import React from 'react'

function Chat({message}) {
  return (
    <div className='ml-auto bg-neutral-300 px-4 py-1 rounded-3xl rounded-tr-none'>
        {message}
    </div>
  )
}

export default Chat