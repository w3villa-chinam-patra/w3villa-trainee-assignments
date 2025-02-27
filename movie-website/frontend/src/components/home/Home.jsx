import React from "react";
import HeroSection from "./HeroSection";
import CardContainer from "../card/CardContainer";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import { MOVIE_CATEGORY } from "../../appCategor";

function Home() {
  const appCategory = useSelector((state) => state.appCategory);
  return (
    <div className="home-container h-full overflow-y-auto">
      <div className="hero-section-container relative h-[450px] md:h-[580px] w-full">
        <HeroSection />
      </div>

      {appCategory === MOVIE_CATEGORY ? (
        <section className="now-playing-section w-full">
          <h1 className="text-xl md:text-2xl font-semibold my-4 md:my-6">
            Now Playing
          </h1>
          <CardContainer list={"now_playing"} />
        </section>
      ) : (
        <section className="on-the-air-section w-full">
          <h1 className="text-xl md:text-2xl font-semibold my-4 md:my-6">
            On The Air
          </h1>
          <CardContainer list={"on_the_air"} />
        </section>
      )}

      {appCategory === MOVIE_CATEGORY ? (
        <section className="upcoming-container my-24 w-full">
          <h1 className="text-xl md:text-2xl font-semibold my-4 md:my-6">
            Upcoming
          </h1>
          <Slider list={"upcoming"} />
        </section>
      ) : (
        <section className="upcoming-container my-24 w-full">
          <h1 className="text-xl md:text-2xl font-semibold my-4 md:my-6">
            Airing Today
          </h1>
          <Slider list={"airing_today"} />
        </section>
      )}

      <section className="top-rated-container my-24 w-full">
        <h1 className="text-xl md:text-2xl font-semibold my-4 md:my-6">
          Top Rated
        </h1>
        <CardContainer list={"top_rated"} />
      </section>
    </div>
  );
}

export default Home;
