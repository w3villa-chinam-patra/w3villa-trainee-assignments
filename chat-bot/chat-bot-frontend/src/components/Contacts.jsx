import React from 'react'
import logo from "../assets/images/logo.png"
import ContactTab from './ContactTab'
import { appData } from "../data/data"

function Contacts({setIndex}) {
  return (
    <div className='bg-slate-200 h-screen'>
      <div className="logo m-2">
        <img className='w-14 mx-auto' src={logo} alt="logo" />
      </div>
      <div className="contact-container h-[86%] overflow-y-scroll">
        {
          appData.map((data,index) => {
            return <ContactTab setIndex={setIndex} key={index} index={index} name={Object.keys(data)[0]} />
          })
        }
      </div>
    </div>
  )
}

export default Contacts