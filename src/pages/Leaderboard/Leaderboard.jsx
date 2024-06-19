import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Base_url, shuffleArray } from '../../Constents/constents'; // Ensure this path is correct
import Cards from '../../components/Card/Cards';
import CommandfullCard from '../../components/Commands/CommandfullCard';
import './Leaderboard.css'; // Import your CSS file for custom styling

function Leaderboard() {
  const [notes, setNotes] = useState([]);
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('note');
  const [selectedOption, setSelectedOption] = useState('recent');

  const handleTabChange = (value) => {
    setTab(value);
  };

  const handleChangefilter = (filterOption) => {
    setSelectedOption(filterOption);

    let filteredNotes = [...notes];
    let filteredCommands = [...commands];

    switch (filterOption) {
      case 'most_likes':
        filteredNotes.sort((a, b) => b.likes - a.likes);
        break;
      case 'less_likes':
        filteredNotes.sort((a, b) => a.likes - b.likes);
        break;
      case 'most_dislikes':
        filteredNotes.sort((a, b) => b.dislikes - a.dislikes);
        break;
      case 'less_dislikes':
        filteredNotes.sort((a, b) => a.dislikes - b.dislikes);
        break;
      case 'recent':
        filteredCommands.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case 'oldest':
        filteredCommands.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case 'random':
        filteredCommands = shuffleArray(filteredCommands);
        break;
      default:
        break;
    }

    setNotes(filteredNotes);
    setCommands(filteredCommands);
  };

  const fetchLeaderboard = () => {
    axios.get(`${Base_url}/leaderboard`)
      .then(response => {
        setNotes(response.data.notes);
        setCommands(response.data.commands);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container'>
      <div className="row text-center mb-3">
        <div className="col">
          <h5
            className={`tab ${tab === 'note' ? 'active' : ''}`}
            onClick={() => handleTabChange('note')}
          >
            MY NOTES
          </h5>
        </div>
        <div className="col">
          <h5
            className={`tab ${tab === 'command' ? 'active' : ''}`}
            onClick={() => handleTabChange('command')}
          >
            MY COMMENTS
          </h5>
        </div>
      </div>

      {tab === 'note' && (
        <div className="row mb-3">
          <div className="col">
            <div className="row text-center">
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'most_likes' ? 'active' : ''}`} onClick={() => handleChangefilter('most_likes')}>Most Likes</h6>
              </div>
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'less_likes' ? 'active' : ''}`} onClick={() => handleChangefilter('less_likes')}>Less Likes</h6>
              </div>
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'most_dislikes' ? 'active' : ''}`} onClick={() => handleChangefilter('most_dislikes')}>Most Dislikes</h6>
              </div>
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'less_dislikes' ? 'active' : ''}`} onClick={() => handleChangefilter('less_dislikes')}>Less Dislikes</h6>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'command' && (
        <div className="row mb-3">
          <div className="col">
            <div className="row text-center">
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'recent' ? 'active' : ''}`} onClick={() => handleChangefilter('recent')}>Recent</h6>
              </div>
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'oldest' ? 'active' : ''}`} onClick={() => handleChangefilter('oldest')}>Oldest</h6>
              </div>
              <div className="col">
                <h6 className={`nav-subtabs ${selectedOption === 'random' ? 'active' : ''}`} onClick={() => handleChangefilter('random')}>Random</h6>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='row'>
        <div className='col'>
          {tab === 'note' && (
            <Cards notes={notes} />
          )}
          {tab === 'command' && (
            <CommandfullCard commant={commands} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
