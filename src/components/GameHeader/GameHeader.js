import React from 'react';
import './GameHeader.css';

const GameHeader = ({ coins }) => {


  return (

    <div className="game-header">
      <div className="game-info">
        {/*<div class="card">
          <div class="loader">
            <p class="coins-text"><span></span></p>
          </div>
        </div>*/}

          <div class="game-info">
            <div class="game-coins">
            <div class="card">
            <div class="card-info">
              <div class="loader"></div> 
              <div class="coins-text">100</div>
              </div>
              </div>
       
            <div class="game-lives">
            <div class="card">
            <div class="card-info">
              <div class="lives-icon"></div> 
              <div class="lives-text">3</div>
            </div>
            </div>
            </div>
          </div>
          <div class="game-settings">
    
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameHeader;
