import { useEffect } from 'react'
import Card from "./Card"
function MovieSection() {
  useEffect(() => {
    (async () => {
      const URL = "http://www.omdbapi.com/?apikey="
      const KEY = "4eb9d186"
      try {
        const response = await fetch(`${URL}${KEY}&s=batman&page=2`);
        const data = response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching the API: ", error);
      }
    })();
  }, []);
  return (
    <div className='movies-section'>
      <div className="search-box">
        <input type="text" placeholder='Search for movies or TV series' />
      </div>
      <div className="movies-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default MovieSection