import React from 'react'
import { IoMdContact } from "react-icons/io";
import { appData } from '../data/data';
import { RiRobot3Fill } from "react-icons/ri";

function ContactTab({ name, setIndex, ind, index }) {

  const clickHandler = () => {
    setIndex(ind);
  }
  return (
    <div id={ind} className={`relative flex my-[2px] p-1 gap-2 cursor-pointer ${index === ind ? "bg-neutral-200 dark:bg-neutral-600" : "bg-neutral-100 dark:bg-neutral-700"} hover:bg-slate-200 dark:hover:bg-slate-600 `} onClick={clickHandler}>
      {
        ind === 0 ?
          <RiRobot3Fill className='text-5xl border-2 border-neutral-300 dark:border-neutral-500 p-1 bg-neutral-100 dark:bg-neutral-600 fill-neutral-300 dark:fill-neutral-400 rounded-full shrink-0' />
          :
          <IoMdContact className='text-5xl bg-neutral-100 dark:bg-neutral-600 fill-neutral-300 dark:fill-neutral-400 rounded-full shrink-0' />
      }
      <div className="contact-info py-2 w-full">
        <div className="wrapper flex justify-between">
          <div className="contact-name text-sm">{name}</div>
          <div className="time text-xs text-neutral-400">
            02:01
          </div>
        </div>
        <div className="last-message text-xs text-neutral-400">{`${(appData[ind][name]?.at(-1))?.message ? appData[ind][name]?.at(-1)?.message?.substring(0, 35) + "..." : ""}`}</div>
      </div>
    </div>
  )
}

export default ContactTab