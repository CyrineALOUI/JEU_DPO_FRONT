import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import crosswordService from '../../../services/CrosswordService';
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
  const [revealedWords, setRevealedWords] = useState(new Set());

  useEffect(() => {
    const fetchCrossword = async () => {
      try {
        const data = await crosswordService.getCrosswordById(crosswordId);
        setCrossword(data);
        initializeSelectedLetters(data);
      } catch (error) {
        console.error('Error fetching crossword:', error);
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

    if (Array.isArray(data.words)) {
      data.words.forEach(word => {
        for (let i = 0; i < word.word.length; i++) {
          const x = word.startX + (word.horizontal ? i : 0);
          const y = word.startY + (word.vertical ? i : 0);
          const key = `${x},${y}`;
          initialFillableCells[key] = true;
          initialCorrectLetters[key] = word.word[i].toUpperCase();
          initialSelectedLetters[key] = '';  // Pas de mots révélés initialement
        }
      });
    }

    setSelectedLetters(initialSelectedLetters);
    setFillableCells(initialFillableCells);
    setCorrectLetters(initialCorrectLetters);
  };

  const handleInputChange = (event, x, y) => {
    const newValue = event.target.value.toUpperCase();
    const key = `${x},${y}`;

    // Mettre à jour les lettres sélectionnées
    const updatedSelectedLetters = {
      ...selectedLetters,
      [key]: newValue,
    };

    setSelectedLetters(updatedSelectedLetters);  // Mise à jour de l'état des lettres saisies

    // Vérifier si toutes les lettres d'un mot sont remplies
    const word = crossword.words.find(w => {
      return (
        (w.horizontal && w.startY === y && x >= w.startX && x < w.startX + w.word.length) ||
        (w.vertical && w.startX === x && y >= w.startY && y < w.startY + w.word.length)
      );
    });

    if (word) {
      const wordComplete = word.word.split('').every((letter, index) => {
        const xOffset = word.horizontal ? index : 0;
        const yOffset = word.vertical ? index : 0;
        const key = `${word.startX + xOffset},${word.startY + yOffset}`;
        return updatedSelectedLetters[key] !== '' && updatedSelectedLetters[key] === letter.toUpperCase();
      });

      // Si toutes les lettres sont saisies, valider le mot
      if (wordComplete) {
        validateWord(word, updatedSelectedLetters);  // Passer l'état mis à jour pour validation
      }
    }
  };

  const validateWord = async (word, updatedSelectedLetters) => {
    const isCorrect = word.word.split('').every((letter, index) => {
      const x = word.startX + (word.horizontal ? index : 0);
      const y = word.startY + (word.vertical ? index : 0);
      const key = `${x},${y}`;
      return updatedSelectedLetters[key] === letter.toUpperCase();  // Utilisation des lettres mises à jour
    });

    if (isCorrect) {
      setRevealedWords(prev => new Set(prev.add(word.word)));

      const updatedGrid = { ...updatedSelectedLetters };
      for (let i = 0; i < word.word.length; i++) {
        const x = word.startX + (word.horizontal ? i : 0);
        const y = word.startY + (word.vertical ? i : 0);
        const key = `${x},${y}`;
        updatedGrid[key] = word.word[i].toUpperCase();  // Met à jour la grille avec le mot révélé
      }
      setSelectedLetters(updatedGrid);  // Met à jour l'état de la grille

      try {
        await crosswordService.revealWordManually(crosswordId, word.word);
        toast.success(`Le mot "${word.word}" est correct et révélé !`);
      } catch (error) {
        console.error("Erreur lors de la révélation manuelle:", error);
      }
    } else {
      toast.error(`Le mot "${word.word}" est incorrect.`);
    }
  };




  const getCellClass = (x, y) => {
    const key = `${x},${y}`;

    // Vérifier si la cellule fait partie d'un mot révélé
    const isRevealed = crossword.words.some((word) => {
      for (let i = 0; i < word.word.length; i++) {
        const wordX = word.startX + (word.horizontal ? i : 0);
        const wordY = word.startY + (word.vertical ? i : 0);
        const cellKey = `${wordX},${wordY}`;
        if (cellKey === key && revealedWords.has(word.word)) {
          return true;  // Cette cellule fait partie d'un mot révélé
        }
      }
      return false;
    });

    if (isRevealed) return 'revealed';
    return checkLetter(x, y) ? 'correct-border' : 'incorrect-border';
  };

  const handleRevealWordWithHint = async () => {
    try {
      const revealedWord = await crosswordService.revealWordWithHint(crosswordId);

      if (revealedWord) {
        const word = crossword.words.find(w => w.word === revealedWord);

        if (word) {
          setRevealedWords(prev => new Set(prev.add(revealedWord)));

          const updatedSelectedLetters = { ...selectedLetters };
          for (let i = 0; i < word.word.length; i++) {
            const x = word.startX + (word.horizontal ? i : 0);
            const y = word.startY + (word.vertical ? i : 0);
            const key = `${x},${y}`;
            updatedSelectedLetters[key] = word.word[i].toUpperCase();
          }
          setSelectedLetters(updatedSelectedLetters);
          toast.success(`Le mot "${revealedWord}" a été révélé !`);
        } else {
          toast.error('Mot non trouvé dans la grille.');
        }
      } else {
        toast.error('Aucun mot révélé par l\'indice.');
      }
    } catch (error) {
      console.error('Erreur lors de la tentative d’indice:', error);
      toast.error('Erreur lors de la tentative d’indice.');
    }
  };

  const checkLetter = (x, y) => {
    const key = `${x},${y}`;
    return selectedLetters[key] === correctLetters[key];  // Vérification de la lettre correcte
  };

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
                    const cellValue = selectedLetters[cellKey] || '';
                    const isFillable = fillableCells[cellKey];

                    const wordNumber = crossword.words.find(word => word.startX === x && word.startY === y)?.number;

                    if (!isFillable) {
                      return <td key={cellKey} className="crossword-cell empty-cell"></td>;
                    }

                    return (
                      <td key={cellKey} className={`crossword-cell ${getCellClass(x, y)}`}>
                        {wordNumber && <div className="word-number">{wordNumber}</div>}
                        <input
                          type="text"
                          maxLength="1"
                          className="crossword-input"
                          value={cellValue}
                          onChange={(event) => handleInputChange(event, x, y)}
                          disabled={revealedWords.has(crossword.words.find(word => word.startX === x && word.startY === y)?.word)}
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
          <button className="button-text" onClick={handleRevealWordWithHint}>
            Afficher Un Mot (-25)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crossword;
