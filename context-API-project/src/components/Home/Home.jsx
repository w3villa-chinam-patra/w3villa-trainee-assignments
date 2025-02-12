import React from 'react'
import Card from '../Card/Card'

function Home() {
    return (
        <section className='home-container container flex-1'>
            <div className="item-card-container h-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
                <Card img={"https://cdn-icons-png.flaticon.com/512/1867/1867565.png"} content={"T-shirt"} />
                <Card img={"https://cdn-icons-png.flaticon.com/512/2435/2435572.png"} content={"Trousers"} />
                <Card img={"https://cdn-icons-png.flaticon.com/512/3893/3893203.png"} content={"Coat"} />
                <Card img={"https://cdn-icons-png.flaticon.com/512/1785/1785374.png"} content={"Socks"} />
            </div>
        </section>
    )
}

export default Home