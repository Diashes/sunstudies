import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

/**
 * Home Page for listing sunstudies.
 * 
 */
function Home() {
  const [loading, setLoading] = useState(true);
  const [sunstudies, setSunstudies] = useState([]);

  useEffect(async () => {
    const response = await api.getSunstudies();
    setSunstudies(response.data);
    setLoading(false);
  }, []);

  return (
    <div>
      <ul className="Home__list">
        {loading && <p>Loading...</p>}
        {!loading && sunstudies.filter(({images}) => images.length).length === 0 && <p>No posts available yet.</p>}
        {sunstudies.filter(({images}) => images.length).map(({id, name, images}) => (
          <li key={id}>
            <Link to={`/show/${id}`}>
              <img src={images[0].path} alt="" />
              <div>{name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
