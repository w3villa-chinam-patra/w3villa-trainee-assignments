import { FaPlay } from "react-icons/fa";
import { RiDownloadLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
function PosterSlide({ imgUrl }) {
    return (
        <div className='poster-card w-full h-full text-white'>
            <img src={imgUrl} alt="" />
            <div className="overlay absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent flex flex-col gap-4 p-8 justify-between items-start">
                <div className="tag text-sm px-4 py-2 backdrop-blur-3xl rounded-full">
                    🔥 Now Popular
                </div>
                <div className="movie-info text-start flex flex-col gap-4">
                    <div className="category flex gap-4">
                        <div className='px-2 py-1 text-sm backdrop-blur-3xl rounded-full'>Drama</div>
                        <div className='px-2 py-1 text-sm backdrop-blur-3xl rounded-full'>Fantasy</div>
                    </div>
                    <h1 className='text-3xl font-black'>Mavika</h1>
                    <div className='max-w-xl text-sm'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus nesciunt iure harum ut nisi est, cupiditate perspiciatis expedita omnis veniam minus quos minima sit facere temporibus laudantium, doloribus quasi error!
                    </div>
                    <div className="buttons flex gap-2">
                        <button className="watch-now-button flex items-center gap-2 bg-white hover:bg-white/80 cursor-pointer text-neutral-950 px-4 py-2 rounded-full">
                            <FaPlay />
                            <div>Watch Now</div>
                        </button>
                        <button className="download-button flex items-center gap-2 bg-gray-900 hover:bg-gray-800 cursor-pointer  px-4 py-2 rounded-full">
                            <RiDownloadLine />
                            <div>Download</div>
                        </button>
                        <button className="download-button flex items-center gap-2 bg-gray-900 hover:bg-gray-800 cursor-pointer  px-4 py-2 rounded-full">
                            <HiOutlineDotsHorizontal />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PosterSlide