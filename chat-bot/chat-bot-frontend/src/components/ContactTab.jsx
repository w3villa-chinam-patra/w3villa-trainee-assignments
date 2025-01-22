import React from 'react'
import { IoMdContact } from "react-icons/io";

function ContactTab({name, setIndex, index}) {

    const clickHandler = ()=>{
        setIndex(index);
        console.log(index)
    }
  return (
    <div className='relative flex items-center m-1 p-1 bg-slate-300 gap-2 cursor-pointer' onClick={clickHandler}>
        <IoMdContact className='text-5xl text-slate-600' />
        <div className="contact-name text-sm">{name}</div>
    </div>
  )
}

export default ContactTab