import React from 'react'
import HeroSection from './HeroSection'
import CardContainer from '../card/CardContainer'
import Slider from './Slider'

function Home() {
    return (
        <div className='hero-section-container w-full h-[580px] relative p-2'>
            <HeroSection />
            <div className=' mt-[600px]'></div>

            <section className="now-playing-section">
                <h1 className='text-2xl font-semibold my-6'>Now Playing</h1>
                <CardContainer movieList={"now_playing"} />
            </section>
            
            <section className="upcoming-container my-24">
                <h1 className='text-2xl font-semibold my-6'>Upcoming</h1>
                <Slider movieList={"upcoming"} />
            </section>
            
            <section className="top-rated-container my-24">
                <h1 className='text-2xl font-semibold my-6'>Top Rated</h1>
                <CardContainer movieList={"top_rated"} />
            </section>
        </div>
    )
}

export default Home