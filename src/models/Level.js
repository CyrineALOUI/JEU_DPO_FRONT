import Game from './Game';

class Level {
    constructor(id, levelNumber, title, description, difficulty, player, games) {
        this.id = id;
        this.levelNumber = levelNumber;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.player = player;
        this.games = games.map(game => new Game(game.id, this));
    }
}
export default Level;

