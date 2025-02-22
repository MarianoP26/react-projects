import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

function App() {

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try{
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchTours();
  }, []);

  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  if(loading){
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>No tours left</h2>
        <button className="btn" onClick={()=> fetchTours()}>
          refresh
        </button>
      </div>
    </main>
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
}

export default App
