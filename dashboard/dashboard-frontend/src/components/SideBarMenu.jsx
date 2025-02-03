import { Link } from "react-router";

function SideBarMenu({ heading, options, isSelected, setIsSelected }) {
  const onClickHandler = (event, subOptions) => {
    setIsSelected(event.currentTarget.childNodes[0].childNodes[1].innerText);
    if (subOptions) {
      if (event.currentTarget.nextSibling.style.height === "") {
        event.currentTarget.nextSibling.style.height = 0;
        event.currentTarget.lastChild.style.transform = "";
      } else {
        event.currentTarget.nextSibling.style.height = "";
        event.currentTarget.lastChild.style.transform = "rotate(90deg)";
      }
    }
  }

  return (
    <div className='transition-all duration-500 ease-in-out'>
      <div className='uppercase text-sm my-2 font-bold tracking-tighter'>{heading}</div>
      <div className='text-sm font-semibold'>
        {
          options.map((obj, i) => {
            return <div key={i}>
              <Link to={`${obj.route ? obj.route : "#"}`} onClick={(event) => onClickHandler(event, obj.subOptions)} className={`flex items-center justify-between m-1 p-4 rounded-xl cursor-pointer ${isSelected === obj.text ? "bg-gradient-to-bl from-pink-500 to-amber-500 text-white" : "hover:bg-zinc-800"}`}>
                <div className="flex gap-3">
                  <div className='logo text-xl'>
                    {obj.icon}
                  </div>
                  <div>{obj.text}</div>
                </div>
                {obj.subOptions ? <div>&gt;</div> : ""}
              </Link>
              {obj.subOptions ? <div className="ms-8 overflow-hidden" style={{ height: "0" }}>
                <SideBarMenu options={obj.subOptions} isSelected={isSelected} setIsSelected={setIsSelected} />
              </div> : ""}
            </div>
          })
        }
      </div>
    </div>
  )
}

export default SideBarMenu