import React from 'react'

function Form() {
  return (
    <section>
      <div className="wrapper p-4 overflow-y-auto">
        <div className="form-container p-4 rounded-3xl bg-white flex flex-col justify-center items-center">
          <div className="form-title text-xl font-bold text-center">
            Form title
          </div>
          <div className="form-wrapper border border-neutral-400 rounded-2xl p-2 w-full max-w-2xl">
            <form className='bg-neutral-100 p-6 rounded-2xl' action="">
              <div className='field-container'>
                <label className='text-sm' htmlFor="name">Enter Your name</label>
                <br />
                <input className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='name' type="text" />
              </div>
              <div className="field-container">
                <label className='text-sm' htmlFor="message">Enter Your name</label>
                <br />
                <textarea className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' name="" id="message"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Form