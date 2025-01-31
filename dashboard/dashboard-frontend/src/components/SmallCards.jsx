import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import boy from "../assets/boy.png";
import girl from "../assets/girl.png";



function SmallCards({title,text}) {
    return (
        <div className='bg-white rounded-3xl p-4'>
            <div className='font-extrabold text-base flex items-center justify-between my-1'>
                {title}
                <div className='text-neutral-700 text-xs bg-slate-100 p-2 rounded-full'>
                    <SlOptionsVertical />
                </div>
            </div>
            <div className='text-xs text-slate-500'>{text}</div>
            <div className='my-2 flex justify-between'>
                <div className='text-xs flex gap-1 items-center font-bold text-slate-900'>
                    <MdOutlineAccessTime className='text-red-600 text-base -mt-1' />
                    Updated 5 Hours ago
                </div>
                <div className="flex shrink-0">
                    <div className="-ml-4 bg-white border-2 border-white rounded-full">
                        <img src={boy} alt="boy" className="w-8" />
                    </div>
                    <div className="-ml-4 bg-white border-2 border-white rounded-full">
                        <img src={girl} alt="girl" className="w-8" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallCards