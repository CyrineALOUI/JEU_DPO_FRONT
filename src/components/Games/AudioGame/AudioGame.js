import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import audioGameService from '../../../services/AudioGameService';
import { toast } from 'react-toastify';
import { useScore } from '../../GameHeader/Score/ScoreContext';
import GameHeader from '../../GameHeader/GameHeader';
import correctSound from '../../../assets/Sound/correct-sound.mp3';
import incorrectSound from '../../../assets/Sound/incorrect-sound.mp3';
import { audioOptions } from '../../Utils/SoundUtils';
import './AudioGame.css';
import GameControl from '../../GameControl/GameControl';

const AudioGame = () => {
    const { id: audioId } = useParams();
    const navigate = useNavigate();
    const [audioGame, setAudioGame] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const { score, updateScore } = useScore();
    const correctAudioRef = useRef(new Audio(correctSound));
    const incorrectAudioRef = useRef(new Audio(incorrectSound));
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchAudioGame = async () => {
            try {
                const data = await audioGameService.getAudioGameById(audioId);
                setAudioGame(data);
            } catch (error) {
                toast.error('Impossible de charger le jeu audio');
            }
        };

        fetchAudioGame();
    }, [audioId]);

    const handleSelectionChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedOption(selectedId);
    };

    const checkAnswer = async () => {
        if (selectedOption === null) {
            toast.warning('Veuillez sélectionner une option.');
            return;
        }

        try {
            const isCorrectAnswer = await audioGameService.verifyAnswerAudio(audioGame.id, selectedOption);
            setIsCorrect(isCorrectAnswer);
            if (isCorrectAnswer) {
                correctAudioRef.current.play();
                updateScore(score + 100);
                toast.success("Bravo !🎉 Vous avez débloqué un nouveau badge !");
            } else {
                incorrectAudioRef.current.play();
            }
            setTimeout(() => {
                navigate('/map');
            }, 2000);
        } catch (error) {
            toast.error('Une erreur est survenue lors de la vérification de la réponse.');
        }
    };

    const handleIgnoreLevel = () => {
        navigate('/map');
    };

    if (!audioGame) {
        return <div className="loading-message">Chargement...</div>;
    }

    return (
        <div className="Map-Container">
            <GameHeader />
            <GameControl isPaused={isPaused} setIsPaused={setIsPaused} />
            <div className="glass-box-audio">
                <h3 className="audio-instructions">
                    {audioGame.questionAudio}
                </h3>
                <div className="audio-game-container">
                    {audioGame.audioOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`voice-chat-card ${isCorrect !== null && selectedOption === option.id
                                ? isCorrect ? 'correct-container' : 'incorrect-container'
                                : ''
                                }`}
                        >
                            <div className="voice-chat-card-header">
                                <div className="username">{option.audioTitle}</div>
                            </div>
                            <div className="voice-chat-card-body">
                                <div className="radio-and-audio">
                                    <input
                                        type="radio"
                                        id={`audio-${option.id}`}
                                        name="audio-option"
                                        value={option.id}
                                        checked={selectedOption === option.id}
                                        onChange={handleSelectionChange}
                                        disabled={isCorrect !== null}
                                    />
                                    <audio controls>
                                        <source src={audioOptions[option.id]} type="audio/mp3" />
                                        Votre navigateur ne supporte pas l'élément audio.
                                    </audio>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="button-group">
                    <button className="button-text" onClick={checkAnswer} disabled={isCorrect !== null}>
                        Valider
                    </button>
                    <button className="button-text" onClick={handleIgnoreLevel}>
                        Ignorer Ce Niveau
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioGame;
