import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);


  const fetchJobs = async () => {
    let response = await fetch(url);
    let data = await response.json();
    setJobs(data);
    setLoading(false);
  }

  useEffect(()=>{
    fetchJobs();
  }, []);


  if (loading){
    return <section className="section loading">
      <h1>Loading...</h1>
    </section>
  }

  const {company, dates, duties, title} = jobs[index];
  return <section className="section">
    <div className="title">
      <h2>Experience</h2>
      <div className="underline"></div>
    </div>
    <div className="jobs-center">
      {/*btn container*/}
      <div className="btn-container">
        {jobs.map((job, jobIndex)=>{
          return <button key={job.id} onClick={()=> setIndex(jobIndex)}
          className={`job-btn ${jobIndex===index && 'active-btn'}`}>
            {job.company}
          </button> 
        })}
      </div>
      {/* job info */}
      <article className="job-info">
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className="job-date">{dates}</p>
        {duties.map((duty, index)=>{
          return <div key={index} className="job-desc">
            <FaAngleDoubleRight className="job-icon"/>
            <p>{duty}</p>
          </div>
        })}
      </article>
    </div>
  </section>
}

export default App
