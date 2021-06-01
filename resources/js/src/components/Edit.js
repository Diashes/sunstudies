import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import api from '../api';

/**
 * Edit Page for editing sunstudy.
 * 
 */
function Edit() {
  let { id } = useParams();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [timePerImage, setTimePerImage] = useState('');
  const [sunBasedOnDate, setSunBasedOnDate] = useState('');
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(async () => {
    const { data: sunstudy } = await api.getSunstudy(id);
    setName(sunstudy.name);
    setStartTime(sunstudy.start_time);
    setTimePerImage(sunstudy.time_per_image);
    setSunBasedOnDate(sunstudy.sun_based_on_date);
    setImages(getImagesWithTime(sunstudy.images, sunstudy));
    if (query.has('new')) {
      history.push(`/edit/${sunstudy.id}`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 4000);
    }
  }, []);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);

      if (deletedImages.length) {
        await api.deleteImages(deletedImages.map((image) => image.id).join(","));
        setDeletedImages([]);
      }

      await api.updateSunstudy(id, {
        name,
        start_time: startTime,
        time_per_image: timePerImage,
        sun_based_on_date: sunBasedOnDate,
        images
      });

      setLoading(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 4000);
    } catch (err) {
      setLoading(false);
      console.log(err)
      alert('Failed to update sunstudy');
    }
  }

  function getImagesWithTime(items, { sun_based_on_date, start_time, time_per_image } = {}) {
    const [year, month, day] = (sun_based_on_date || sunBasedOnDate).split('-');
    const [hour, minutes] = (start_time || startTime).split(':');
    const [hoursPerImage, minutesPerImage] = (time_per_image || timePerImage).split(':');
    return items.map((image, index) => {
      const date = new Date(year, month, day, hour, minutes);
      if (Number.parseInt(hoursPerImage)) date.setHours(date.getHours() + hoursPerImage * index);
      if (Number.parseInt(minutesPerImage)) date.setMinutes(date.getMinutes() + minutesPerImage * index);
      const currentTime = `${date.getHours()}:${date.getMinutes()}`;
      return ({ ...image, currentTime });
    });
  }

  async function handleUpload(event) {
    try {
      const formData = new FormData();
      const files = Array.from(event.target.files);
      if (!files.length) return;
      files.forEach((file) => formData.append('images[]', file));
      const response = await api.uploadImages(formData);
      const uploadedImages = response.data;
      setImages(getImagesWithTime(images.concat(uploadedImages)));
    } catch (err) {
      console.log(err)
      alert('Failed to upload images');
    }
  }

  function handleDelete(deletedImage) {
    setDeletedImages([...deletedImages, deletedImage]);
    setImages(images.filter((image) => image.id !== deletedImage.id));
  }

  return (<>
    {showSuccessMessage && (
      <div className="Message">Sunstudy was saved</div>
    )}
    <form onSubmit={handleSubmit} className="SunstudyForm">
      <h1>Edit</h1>
      <fieldset>
        <legend>Information</legend>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="time_per_image">Time per image</label>
        <input
          type="text"
          name="time_per_image"
          id="time_per_image"
          value={timePerImage}
          onChange={(e) => setTimePerImage(e.target.value)}
        />
        <label htmlFor="start_time">Start time</label>
        <input
          type="text"
          name="start_time"
          id="start_time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="sun_based_on_date">Sun based on date</label>
        <input
          type="text"
          name="sun_based_on_date"
          id="sun_based_on_date"
          value={sunBasedOnDate}
          onChange={(e) => setSunBasedOnDate(e.target.value)}
        />
      </fieldset>

      {timePerImage && startTime && sunBasedOnDate && <>
        <fieldset>
          <legend>Choose images</legend>
          <p>Total images: {images.length}</p>
          <div className="SunstudyForm__images">
            {images.map((image, index) => (
              <div 
                className="SunstudyForm__image"
                key={image.id}
                style={{ background: `center / contain no-repeat url(${window.location.origin}/${image.path})`}}
                alt={image.name}
                onClick={() => handleDelete(image)}>
                <div className="SunstudyForm__image__index">{index}</div>
                <div className="SunstudyForm__image__time">{image.currentTime}</div>
                <div className="SunstudyForm__image__name">{image.name.split('.')[1]}</div>
              </div>
            ))}
            <input
              type="file"
              name="images[]"
              id="images"
              multiple
              accept="image/*"
              onChange={handleUpload}
            />
            <label htmlFor="images"></label>
          </div>
        </fieldset>
        <button className="Btn" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </>}
    </form>
  </>);
}

export default Edit;
