import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

/**
 * Show Page for showing sunstudy.
 * 
 */
function Show() {
  let onScroll;
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const heightPerImage = 50;
  
  useEffect(() => {
    api.getSunstudy(id).then(({data: sunstudy}) => {
      setImages(getImagesWithTime(sunstudy));
      const $show = window.document.querySelector('.Show');
      $show.style.height = window.innerHeight + heightPerImage * sunstudy.images.length + 'px';
      window.addEventListener('scroll', onScroll = () => handleScroll(sunstudy.images.length - 1));
    }).catch((error) => {
      console.error(error);
      alert('Failed to load sunstudy');
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleScroll(count) {
    const index = Math.min(Math.floor(window.scrollY / heightPerImage), count);
    setCurrentIndex(index);
  }

  function getImagesWithTime(sunstudy) {
    const [year, month, day] = sunstudy.sun_based_on_date.split('-');
    const [hour, minutes] = sunstudy.start_time.split(':');
    const [hoursPerImage, minutesPerImage] = sunstudy.time_per_image.split(':');
    return sunstudy.images.map((image, index) => {
      const date = new Date(year, month, day, hour, minutes);
      if (Number.parseInt(hoursPerImage)) date.setHours(date.getHours() + hoursPerImage * index);
      if (Number.parseInt(minutesPerImage)) date.setMinutes(date.getMinutes() + minutesPerImage * index);
      const currentTime = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      return ({ ...image, currentTime });
    });
  }

  return (
    <div className="Show">
      {images.map((image, index) => (
        <div className="Show__image" key={index} style={{ opacity: `${currentIndex === index ? '1' : '0'}`}}>
          <div className="Show__time">{image.currentTime}</div>
          <img src={`${window.location.origin}/${image.path}`} />
        </div>
      ))}
    </div>
  );
}

export default Show;
