import React from 'react'
import { IoMdContact } from "react-icons/io";
import { appData } from '../data/data';

function ContactTab({ name, setIndex, ind, index }) {

  const clickHandler = () => {
    setIndex(ind);
  }
  return (
    <div id={ind} className={`relative flex m-[2px] rounded-md p-1 gap-2 shadow-md cursor-pointer ${index === ind ? "bg-neutral-200 dark:bg-neutral-600" : "bg-neutral-100 dark:bg-neutral-700"} hover:bg-slate-200 dark:hover:bg-slate-600 `} onClick={clickHandler}>
      <IoMdContact className='text-5xl bg-neutral-100 dark:bg-neutral-600 fill-neutral-300 dark:fill-neutral-400 rounded-full shrink-0' />
      <div className="contact-info py-2 w-full">
        <div className="wrapper flex justify-between">
          <div className="contact-name text-sm">{name}</div>
          <div className="time text-xs text-neutral-400">
            02:01
          </div>
        </div>
        <div className="last-message text-xs text-neutral-400">{`${(appData[ind][name].at(-1)).substring(0, 30)}...`}</div>
      </div>
    </div>
  )
}

export default ContactTab