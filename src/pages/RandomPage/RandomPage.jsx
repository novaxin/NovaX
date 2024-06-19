import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../../components/Card/Cards';
import { Base_url, shuffleArray } from '../../Constents/constents';

function RandomPage() {
  const [note, setNote] = useState([]);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = () => {
    axios.get(`${Base_url}/random`)
      .then(response => {
        const shuffledNotes = shuffleArray(response.data);
        setNote(shuffledNotes);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRandomizeClick = () => {
    fetchNote();
  };

  return (
    <div className='container'>
        <div className="row text-center">
            <div className="col">
            <p className="nav-subtabs" onClick={handleRandomizeClick}>
            Randomize Notes
          </p>
            </div>
        </div>
      <div className='row'>
        <div className='col'>
          <Cards notes={note} />
        </div>
      </div>
    </div>
  );
}

export default RandomPage;
