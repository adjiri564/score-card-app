import { useEffect, useState } from "react";
import Card from "./Card";
import ScoreBoard from "./Scoreboard";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

const CardContainer = () => {
    const [cards, setCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [powerCard, setPowerCard] = useState(null);
    
    useEffect(() => {
        fetchCards()
    }, []);

    useEffect(() =>{
        let interval = null;
        if(isTimerRunning && timer > 0){
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            },1000);
        } else if (!isTimerRunning && timer !== 0){
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isTimerRunning, timer])

    const fetchCards = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12')
            const pokemonList = response.data.results
            setCards(pokemonList)
            shuffleCards(pokemonList)
        }
        catch (error) {
            console.error('Error fetching cards: ',error)
        }
        
    }

    const shuffleCards = (cards) =>{
        const shuffled = cards.sort(()=>Math.random() - 0.5)
        setCards(shuffled)
    }

    // eslint-disable-next-line no-unused-vars
    const handleClick = (card) => {
        if(powerCard && powerCard.type === "skip"){
            setPowerCard(null);
            return;
        }
        setCurrentScore(currentScore + 1);
        setStreak(streak + 1);
        if(currentScore + 1 > bestScore){
            setBestScore(currentScore + 1)
        }
        if (streak >= 5){
            setPowerCard({
                type: "bonus",
                value: 10,
            });
        }

    };

    const handlePowerCard = () => {
        if (powerCard && powerCard.type === "bonus"){
            setCurrentScore(currentScore + powerCard.value);
            setPowerCard(null);
        }
    };

    const startTimer = () => {
        setIsTimerRunning(true);
        setTimer(60);
    }

    return(
        <>
        <div className="container mx-auto p-4">
            <ScoreBoard
                currentScore={currentScore}
                bestScore={bestScore}
                streak={streak}
                timer={timer}
                isTimerRunning={isTimerRunning}
            />
        </div>
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3 gap-4 mt-4">
                {Array.isArray(cards) && cards.map((card, index) => (
                    <div key={uuidv4()} onClick={() => handleClick(card)}>
                        <Card image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} title={card.name} />
                    </div>
                ))}
            </div>
            {powerCard && (
                <div className="power-card">
                    <p>{powerCard.type === "bonus" ? `+${powerCard.value}` : "Skip"}</p>
                    <button onClick={handlePowerCard}>Use Power Card</button>
                </div>
            )}
            <button onClick={startTimer}>Start Timer</button>
        </div>
        </>
        
    )
}

export default CardContainer