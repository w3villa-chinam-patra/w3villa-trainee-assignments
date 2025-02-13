import React from 'react'
import HeroSection from './HeroSection'

function Home() {
    return (
        <div className='hero-section-container w-full h-[500px] relative p-4'>
            <HeroSection />
            <div className="you-might-like-container">
                <h1 className='text-xl font-bold mt-[500px]'>You might like</h1>
            </div>
        </div>
    )
}

export default Home