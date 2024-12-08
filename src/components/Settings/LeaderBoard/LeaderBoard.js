import React, { useEffect, useState } from 'react';
import playerService from '../../../services/PlayerService';
import { FaArrowLeft } from "react-icons/fa";
import './LeaderBoard.css';
import coin from '../../../assets/Pictures/coin.png';
import goldMedal from '../../../assets/Pictures/medals/medal-gold.png';
import silverMedal from '../../../assets/Pictures/medals/medal-silver.png';
import bronzeMedal from '../../../assets/Pictures/medals/medal-bronze.png';

const Leaderboard = ({ onBackToSettings }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await playerService.getLeaderboard();
                setLeaderboard(data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div>Loading leaderboard...</div>;
    }

    return (
        <div className="settings-body">
            <button className="return-button" onClick={onBackToSettings}>
                <FaArrowLeft />
            </button>
            <div className="delete-account-title">
                <h1>Classement</h1>
            </div>
            <div className="leaderboard-list">
                {leaderboard.map((player, index) => (
                    <div className="leaderBoardCard">
                        <div className="position">
                            {index + 1 <= 3 ? (
                                <div className="medal-container">
                                    <img
                                        src={
                                            index + 1 === 1
                                                ? goldMedal
                                                : index + 1 === 2
                                                    ? silverMedal
                                                    : bronzeMedal
                                        }
                                        alt="Medal"
                                        className="medal-icon"
                                    />
                                    <span className="medal-number">{index + 1}</span>
                                </div>
                            ) : (
                                <span className="position-number">{index + 1}</span>
                            )}
                        </div>

                        <div className={`leaderBoardWrapper ${index + 1 <= 3 ? 'has-medal' : ''}`}>
                            <h1 className="leaderBoardHeading">
                                {player.firstName} {player.lastName}
                            </h1>
                        </div>

                        <button className="score-card">
                            <img src={coin} alt="Coin" className="coin-icon" />
                            <span className="score-text">{player.score}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
