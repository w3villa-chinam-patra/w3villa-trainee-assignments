import React, { useEffect } from 'react'
import ContactTab from './ContactTab'
import { appData } from "../data/data"
import { CiSearch } from "react-icons/ci";
import { BiSolidMessageDetail } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { MdLightMode } from "react-icons/md";

function Contacts({ setIndex, index, setIsDark }) {
  const onClickHandler = () => {
    setIsDark((prev) => {
      localStorage.setItem("isDark", JSON.stringify(!prev))
      return !prev
    });
  }
  return (
    <div className='bg-neutral-100 h-screen flex flex-col dark:text-neutral-100 dark:bg-neutral-700 border-r border-r-neutral-300 dark:border-r-neutral-600'>
      <div className="main-section p-3 flex bg-neutral-200 dark:bg-neutral-700 justify-between">
        <img className='w-12 m-1' src="/images/logo.png" alt="logo" />
        <div className="options flex text-neutral-500 dark:text-neutral-200 items-center gap-2 mx-2">
          <div className='p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer' onClick={onClickHandler}>
            <MdLightMode className='text-2xl' />
          </div>
          <div className='p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer'>
            <BiSolidMessageDetail className='text-2xl' />
          </div>
          <div className='p-3 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-full cursor-pointer'>
            <SlOptionsVertical />
          </div>
        </div>
      </div>
      <div className="search-box-container bg-inherit py-2 px-4  ">
        <div className="flex p-2 gap-2 bg-white rounded-md dark:bg-neutral-500">
          <div>
            <CiSearch className='text-xl text-neutral-500 dark:text-neutral-200' />
          </div>
          <input type="text" className='w-full text-sm rounded-sm outline-none dark:bg-neutral-500' placeholder='Search or start new chat' />
        </div>
      </div>
      <div className="contact-container flex-1 overflow-y-auto">
        {
          appData.map((data, ind) => {
            return <ContactTab setIndex={setIndex} key={ind} ind={ind} index={index} name={Object.keys(data)[0]} />
          })
        }
      </div>
    </div>
  )
}

export default Contacts