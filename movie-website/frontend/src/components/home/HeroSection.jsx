import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "./HeroSectionStyle.css";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import PosterSlide from './PosterSlide';

function HeroSection() {
    return (
        <div className='carousel-container absolute inset-4 rounded-2xl overflow-hidden border border-neutral-700'>
            <Swiper
                loop={true} // Enables infinite looping
                autoplay={{
                    delay: 3000, // Auto-slide every 3 seconds
                    disableOnInteraction: false, // Keeps autoplay active after user interaction
                }}
                navigation={true} // Enables navigation arrows
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Navigation, Autoplay, Pagination]}
                slidesPerView={1}
                onMouseEnter={(swiper) => swiper.autoplay.stop()} // Pause on hover
                onMouseLeave={(swiper) => swiper.autoplay.start()} // Resume on mouse leave
            >
                <SwiperSlide>
                    <PosterSlide imgUrl={"https://img4.hulu.com/user/v3/artwork/666cfe45-a021-4476-a003-390c198a5c13?base_image_bucket_name=image_manager&base_image=b7df87e8-07b6-47b5-a03c-d781882d6777&size=1200x630&format=webp"} />
                </SwiperSlide>
                <SwiperSlide>
                    <PosterSlide imgUrl={"https://pbs.twimg.com/media/DtQ-q3YV4AAvLAL.jpg"} />
                </SwiperSlide>
                <SwiperSlide>
                    <PosterSlide imgUrl={"https://i.pinimg.com/736x/8b/0e/c1/8b0ec10270dbda2b15779da9745ea7a3.jpg"} />
                </SwiperSlide>
            </Swiper>
        </div >
    )
}

export default HeroSection