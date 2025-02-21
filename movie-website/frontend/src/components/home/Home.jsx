import React from 'react'
import HeroSection from './HeroSection'
import CardContainer from '../card/CardContainer'
import Slider from './Slider'

function Home() {
    return (
        <div className='home-container h-full overflow-y-auto'>
            <div className="hero-section-container relative h-[450px] md:h-[580px] w-full">
                <HeroSection />
            </div>

            <section className="now-playing-section w-full">
                <h1 className='text-xl md:text-2xl font-semibold my-4 md:my-6'>Now Playing</h1>
                <CardContainer movieList={"now_playing"} />
            </section>

            <section className="upcoming-container my-24 w-full">
                <h1 className='text-xl md:text-2xl font-semibold my-4 md:my-6'>Upcoming</h1>
                <Slider movieList={"upcoming"} />
            </section>

            <section className="top-rated-container my-24 w-full">
                <h1 className='text-xl md:text-2xl font-semibold my-4 md:my-6'>Top Rated</h1>
                <CardContainer movieList={"top_rated"} />
            </section>
        </div>
    )
}

export default Home