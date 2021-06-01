import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

/**
 * Admin Page for creating, edit, and deleting sunstudies.
 * 
 */
function Admin() {
  const [loading, setLoading] = useState(true);
  const [sunstudies, setSunstudies] = useState([]);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  useEffect(async () => {
    const response = await api.getSunstudies();
    setSunstudies(response.data);
    setLoading(false);
  }, []);

  async function handleDelete(id) {
    try {
      await api.deleteSunstudy(id);
      setShowDeletedMessage(true);
      setTimeout(() => setShowDeletedMessage(false), 1700);
    } catch {
      alert('Failed to delete post!');
    } finally {
      const response = await api.getSunstudies();
      setSunstudies(response.data);
    }
  }

  return (
    <div className="Admin">
      {showDeletedMessage && (
        <div className="Message">Sunstudy was deleted</div>
      )}
      <Link className="Btn" to={`/new`}>New</Link>
      <ul className="Admin__list">
        {loading && <p>Loading...</p>}
        {!loading && sunstudies.length === 0 && <p>No posts available yet.</p>}
        {sunstudies.map(({id, name}) => (
          <li key={id}>
            <Link className="Btn" to={`/show/${id}`}>
              <span>{id}</span>
              <span>{name}</span>
            </Link>
            <Link className="Btn" to={`/edit/${id}`}>Edit</Link>
            <button className="Btn Btn--red" onClick={() => handleDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
