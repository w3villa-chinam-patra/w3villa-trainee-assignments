import React from 'react'
import { IoMdContact } from "react-icons/io";

function ContactTab() {
  return (
    <div className='relative flex items-center m-1 p-1 bg-slate-300 gap-2 cursor-pointer'>
        <IoMdContact className='text-5xl text-slate-600' />
        <div className="contact-name text-sm">Contact Name</div>
    </div>
  )
}

export default ContactTab