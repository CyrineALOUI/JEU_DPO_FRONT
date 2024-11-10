import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CrosswordService from '../../../services/CrosswordService';
import GameHeader from '../../GameHeader/GameHeader';
import './Crossword.css';

const Crossword = () => {
  const { id: crosswordId } = useParams();
  const [crossword, setCrossword] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState({});
  const [fillableCells, setFillableCells] = useState({});
  const [correctLetters, setCorrectLetters] = useState({});

  useEffect(() => {
    const fetchCrossword = async () => {
      try {
        const data = await CrosswordService.getCrosswordById(crosswordId);
        setCrossword(data);
        initializeSelectedLetters(data);
      } catch (error) {
        console.error('Error fetching crossword details:', error);
      }
    };

    if (crosswordId) {
      fetchCrossword();
    }
  }, [crosswordId]);

  const initializeSelectedLetters = (data) => {
    const initialSelectedLetters = {};
    const initialFillableCells = {};
    const initialCorrectLetters = {};

    data.words.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        const x = word.startX + (word.horizontal ? i : 0);
        const y = word.startY + (word.vertical ? i : 0);
        const key = `${x},${y}`;
        initialSelectedLetters[key] = '';
        initialFillableCells[key] = true;
        initialCorrectLetters[key] = word.word[i].toUpperCase();
      }
    });

    setSelectedLetters(initialSelectedLetters);
    setFillableCells(initialFillableCells);
    setCorrectLetters(initialCorrectLetters);
  };

  const handleInputChange = (event, x, y) => {
    const newValue = event.target.value.toUpperCase();
    setSelectedLetters({
      ...selectedLetters,
      [`${x},${y}`]: newValue,
    });
  };

  const checkLetter = (x, y) => {
    const key = `${x},${y}`;
    return selectedLetters[key] === correctLetters[key];
  };

  if (!crossword) {
    return <div>Loading...</div>;
  }


  return (
    <div className="crossword-container">
      <GameHeader />
      <div className="crossword-content">
        <div className="crossword-clues">
          <div className="across-clues">
            <h2>Horizontale</h2>
            <div className="clues-container">
              {crossword.words.filter(word => word.horizontal).map(word => (
                <div key={word.id} className="clue-item">
                  <p>{word.number}. {word.clue}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="down-clues">
            <h2>Verticale</h2>
            <div className="clues-container">
              {crossword.words.filter(word => word.vertical).map(word => (
                <div key={word.id} className="clue-item">
                  <p>{word.number}. {word.clue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="crossword-grid">
          <table className="crossword-table">
            <tbody>
              {Array.from(Array(crossword.gridSize).keys()).map(y => (
                <tr key={y}>
                  {Array.from(Array(crossword.gridSize).keys()).map(x => {
                    const cellKey = `${x},${y}`;
                    const wordAtCell = crossword.words.find(word => 
                      (word.horizontal && y === word.startY && x >= word.startX && x < word.startX + word.word.length) ||
                      (word.vertical && x === word.startX && y >= word.startY && y < word.startY + word.word.length)
                    );
                    const cellValue = selectedLetters[cellKey] || '';
                    const isFillable = fillableCells[cellKey];
                    const isCorrect = checkLetter(x, y);
  
                    if (!isFillable) {
                      return <td key={cellKey} className="crossword-cell empty-cell"></td>;
                    }
                    return (
                      <td key={cellKey} className={`crossword-cell ${isCorrect ? 'correct-border' : 'incorrect-border'}`}>
                        {wordAtCell && wordAtCell.startX === x && wordAtCell.startY === y && (
                          <span className="word-number">{wordAtCell.number}</span>
                        )}
                        <input
                          type="text"
                          maxLength="1"
                          className="crossword-input"
                          value={cellValue}
                          onChange={(event) => handleInputChange(event, x, y)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default Crossword;
