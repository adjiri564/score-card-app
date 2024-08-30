/* eslint-disable react/prop-types */

const ScoreBoard = ({ currentScore, bestScore, streak, timer, isTimerRunning }) => {
    return (
        <div className="scoreboard">
        <h2 className="scoreboard-title">Scoreboard</h2>
        <div className="scoreboard-content">
        <div className="scoreboard-section">
            <h3>Current Score:</h3>
            <p className="score">{currentScore}</p>
        </div>
        <div className="scoreboard-section">
            <h3>Best Score:</h3>
            <p className="score">{bestScore}</p>
        </div>
        <div className="scoreboard-section">
            <h3>Streak:</h3>
            <p className="score">{streak}</p>
        </div>
        <div className="scoreboard-section">
            <h3>Time Remaining:</h3>
            <p className="score">{timer} seconds</p>
            {isTimerRunning ? (
            <i className="fas fa-clock" />
            ) : (
            <i className="fas fa-stopwatch" />
            )}
        </div>
        </div>
    </div>
    );
};

export default ScoreBoard;