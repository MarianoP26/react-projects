import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {

  const [index, setIndex] = useState(0);
  const {name, job, image, text} = people[index];


  const checkBounds = (index) => {
    if(index > people.length - 1){
      return 0;
    }
    if(index < 0){
      return people.length - 1;
    }

    return index;
  }

  const nextPerson = () => {
    setIndex((index)=>{
      let newIndex = index + 1;
      return checkBounds(newIndex);
    })
  }

  const prevPerson = () => {
    setIndex((index)=>{
      let newIndex = index - 1;
      return checkBounds(newIndex);
    })
  }

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if(randomNumber === index){
      randomPerson();
    }
    setIndex(checkBounds(randomNumber));
  }

  return <article className="review">
    <div className="img-container">
      <img src={image} alt={name} className="person-img"></img>
      <span className="quote-icon">
        <FaQuoteRight />
      </span>
    </div>
    <h4 className="author">{name}</h4>
    <p className="job">{job}</p>
    <p className="info">{text}</p>
    <div className="button-container">
      <button className="prev-btn" onClick={prevPerson}>
        <FaChevronLeft />
      </button>
      <button className="next-btn" onClick={nextPerson}>
        <FaChevronRight />
      </button>
    </div>
    <button className="random-btn" onClick={randomPerson}>
        Surprise me!
      </button>
  </article>;
};

export default Review;
