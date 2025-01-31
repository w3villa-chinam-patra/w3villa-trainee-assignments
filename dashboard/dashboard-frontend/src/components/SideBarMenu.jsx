function SideBarMenu({ heading, options, isSelected, setIsSelected }) {
  const onClickHandler = (event) => {
    setIsSelected(event.currentTarget.lastElementChild.textContent);
  }
  return (
    <div className='my-4'>
      <div className='uppercase text-sm my-2 font-bold tracking-tighter'>{heading}</div>
      <div className='text-sm font-semibold'>
        {
          options.map((obj, i) => {
            return <div onClick={onClickHandler} key={i} className={`flex gap-3 items-center m-1 p-4 rounded-xl cursor-pointer ${isSelected === obj.text ? "bg-gradient-to-bl from-pink-500 to-amber-500 text-white" : "hover:bg-zinc-800"}`}>
              <div className='text-xl'>
                {obj.icon}
              </div>
              <div>{obj.text}</div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default SideBarMenu