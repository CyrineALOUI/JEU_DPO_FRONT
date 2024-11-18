import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CrosswordService from '../../../services/CrosswordService';
import GameHeader from '../../GameHeader/GameHeader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Crossword.css';

const Crossword = () => {
  const { id: crosswordId } = useParams();
  const [crossword, setCrossword] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState({});
  const [fillableCells, setFillableCells] = useState({});
  const [correctLetters, setCorrectLetters] = useState({});
  const [revealedWords, setRevealedWords] = useState([]);

  useEffect(() => {
    const fetchCrossword = async () => {
      try {
        // Récupérer les deux données en parallèle
        const [data, revealedWordsData] = await Promise.all([
          CrosswordService.getCrosswordById(crosswordId),
          CrosswordService.getRevealedWords(crosswordId),
        ]);

        // Mettre à jour les états
        setCrossword(data);

        if (Array.isArray(revealedWordsData)) {
          setRevealedWords(revealedWordsData);
        } else {
          console.error('revealedWordsData is not an array:', revealedWordsData);
          setRevealedWords([]);
        }

        initializeSelectedLetters(data, revealedWordsData);
      } catch (error) {
        console.error('Error fetching crossword details:', error);
      }
    };

    if (crosswordId) {
      fetchCrossword();
    }
  }, [crosswordId]);

  const initializeSelectedLetters = (data, revealedWordsData) => {
    const initialSelectedLetters = {};
    const initialFillableCells = {};
    const initialCorrectLetters = {};

    // Vérification que revealedWordsData est bien un tableau
    if (!Array.isArray(revealedWordsData)) {
      console.error('revealedWordsData is not an array:', revealedWordsData);
      return;
    }

    data.words.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        const x = word.startX + (word.horizontal ? i : 0);
        const y = word.startY + (word.vertical ? i : 0);
        const key = `${x},${y}`;
        initialFillableCells[key] = true;
        initialCorrectLetters[key] = word.word[i].toUpperCase();

        // Si le mot est révélé, on le marque dans selectedLetters
        const isRevealed = revealedWordsData.some(revealedWord => revealedWord.word.id === word.id);
        initialSelectedLetters[key] = isRevealed ? word.word[i].toUpperCase() : '';
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

  const handleShowHint = async () => {
    try {
      const updatedCrossword = await CrosswordService.showHint(crosswordId);
      setCrossword(updatedCrossword);

      // Récupérer les mots révélés mis à jour
      let updatedRevealedWords = await CrosswordService.getRevealedWords(crosswordId);
      
      // Vérifiez si updatedRevealedWords est un tableau
      if (!Array.isArray(updatedRevealedWords)) {
        console.error('updatedRevealedWords is not an array:', updatedRevealedWords);
        updatedRevealedWords = []; // Utiliser un tableau vide par défaut pour éviter les erreurs
      }
      
      // Mettre à jour selectedLetters avec les mots révélés
      setSelectedLetters(prevState => {
        const updatedSelectedLetters = { ...prevState };
        updatedRevealedWords.forEach(revealedWord => {
          const word = crossword.words.find(w => w.id === revealedWord.word.id); // Utilisez revealedWord.word.id
          if (word) {
            for (let i = 0; i < word.word.length; i++) {
              const x = word.startX + (word.horizontal ? i : 0);
              const y = word.startY + (word.vertical ? i : 0);
              const key = `${x},${y}`;
              updatedSelectedLetters[key] = word.word[i].toUpperCase();
            }
          }
        });

        return updatedSelectedLetters;
      });
    } catch (error) {
      console.error('Error revealing hint:', error);
      if (error.message.includes('Coins insuffisants')) {
        toast.error('Vous n\'avez pas assez de coins pour un indice. Vous avez besoin de 30 coins.');
      } else {
        alert('Erreur lors de la tentative d’indice. Veuillez réessayer plus tard.');
      }
    }
  };

  // Utilisation de useMemo pour initialiser les lettres sélectionnées, les cellules remplissables et les lettres correctes
  const initializeSelectedLettersMemoized = useMemo(() => {
    if (!crossword) return {};  // Si crossword est null, ne pas exécuter ce calcul

    const initialSelectedLetters = {};
    const initialFillableCells = {};
    const initialCorrectLetters = {};

    if (!Array.isArray(revealedWords)) {
      console.error('revealedWordsData is not an array:', revealedWords);
      return {};
    }

    crossword.words.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        const x = word.startX + (word.horizontal ? i : 0);
        const y = word.startY + (word.vertical ? i : 0);
        const key = `${x},${y}`;
        initialFillableCells[key] = true;
        initialCorrectLetters[key] = word.word[i].toUpperCase();

        // Si le mot est révélé, on le marque dans selectedLetters
        const isRevealed = revealedWords.some(revealedWord => revealedWord.word.id === word.id);
        initialSelectedLetters[key] = isRevealed ? word.word[i].toUpperCase() : '';
      }
    });

    return { initialSelectedLetters, initialFillableCells, initialCorrectLetters };
  }, [crossword, revealedWords]);

  const { initialSelectedLetters, initialFillableCells, initialCorrectLetters } = initializeSelectedLettersMemoized;

  useEffect(() => {
    if (crossword) {  // On met à jour les états seulement si crossword est défini
      setSelectedLetters(initialSelectedLetters);
      setFillableCells(initialFillableCells);
      setCorrectLetters(initialCorrectLetters);
    }
  }, [initialSelectedLetters, initialFillableCells, initialCorrectLetters, crossword]);

  if (!crossword) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Map-Container">
      <GameHeader />
      <div className="glass-box-quiz">
        <div className="crossword-clues">
          <div className="down-clues">
            <h2>Verticale</h2>
            <br />
            <div className="clues-container">
              {crossword.words.filter(word => word.vertical).map(word => (
                <div key={word.id} className="clue-item">
                  <p>{word.number}. {word.clue}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="across-clues">
            <h2>Horizontale</h2>
            <br />
            <div className="clues-container">
              {crossword.words.filter(word => word.horizontal).map(word => (
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
        <div className="button-group">
          <button className="button-text" onClick={handleShowHint}>
            Indice
          </button>
          <button className="button-text">
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crossword;
