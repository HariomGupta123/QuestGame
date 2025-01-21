import React, { useEffect, useState, useRef } from "react";
import Floor from "./Floor";
import Graffiti from "./Graffiti"; // Import the Graffiti component

const TowerQuestGame = () => {
  const [difficulty, setDifficulty] = useState("Normal"); // Default difficulty
  const [boxes, setBoxes] = useState([]); // Boxes for each floor
  const [floors, setFloors] = useState(8); // Total floors
  const [currentFloor, setCurrentFloor] = useState(1); // Current floor
  const [playerBalance, setPlayerBalance] = useState(5); // Player's points
  const [autoPlayRounds, setAutoPlayRounds] = useState(0); // Auto-play rounds
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Auto-play status
  const [selectedBoxes, setSelectedBoxes] = useState(Array(floors).fill(null)); // Track selected boxes for each floor
  const [isBobs, setBobs] = useState(false);
  const [showGraffiti, setShowGraffiti] = useState(false); // Track whether to show graffiti

  // Use a ref to track the current floor
  const currentFloorRef = useRef(currentFloor);

  // Use a ref to track the selected boxes
  const selectedBoxesRef = useRef(selectedBoxes);

  // Use a ref to track the auto-play interval
  const intervalRef = useRef(null);

  // Use a ref to track consecutive gems
  const consecutiveGemsRef = useRef(0);

  // Update the refs whenever state changes
  useEffect(() => {
    currentFloorRef.current = currentFloor;
  }, [currentFloor]);

  useEffect(() => {
    selectedBoxesRef.current = selectedBoxes;
  }, [selectedBoxes]);

  // Generate boxes for each floor based on difficulty
  const generateBoxes = (difficulty, floors) => {
    const boxes = [];
    for (let floor = 1; floor <= floors; floor++) {
      const floorBoxes = [];
      let gems, bombs;

      switch (difficulty) {
        case "Normal":
          gems = 3;
          bombs = 1;
          break;
        case "Medium":
          gems = 2;
          bombs = 1;
          break;
        case "Hard":
          gems = 1;
          bombs = 2;
          break;
        case "Impossible":
          gems = 1;
          bombs = 3;
          break;
        default:
          gems = 3;
          bombs = 1;
      }

      for (let i = 0; i < gems; i++) {
        floorBoxes.push("gem");
      }
      for (let i = 0; i < bombs; i++) {
        floorBoxes.push("bomb");
      }

      // Shuffle the boxes
      floorBoxes.sort(() => Math.random() - 0.5);
      boxes.push(floorBoxes);
    }

    return boxes;
  };

  // Handle box selection
  const handleBoxSelect = (boxIndex) => {
    const box = boxes[currentFloorRef.current - 1][boxIndex]; // Use the ref value
    const newSelectedBoxes = [...selectedBoxesRef.current]; // Use the ref value
    newSelectedBoxes[currentFloorRef.current - 1] = boxIndex; // Update selected box for the current floor
    setSelectedBoxes(newSelectedBoxes); // Update state
    selectedBoxesRef.current = newSelectedBoxes; // Update ref

    if (box === "gem") {
      setCurrentFloor((prevFloor) => prevFloor + 1); // Update state
      setPlayerBalance((prev) => prev + 5);

      // Increment consecutive gems count
      consecutiveGemsRef.current += 1;

      // // Check if 4 consecutive gems are selected
      // if (isAutoPlay) {
      //   if (consecutiveGemsRef.current === 4) {
      //     setShowGraffiti(true); // Show graffiti animation
      //     setTimeout(() => {
      //       setShowGraffiti(false); // Hide graffiti after 3 seconds
      //       resetGame();
      //     }, 3000);
      //     setIsAutoPlay(false); // Stop auto-play
      //     if (intervalRef.current) {
      //       clearInterval(intervalRef.current);
      //     }
      //     return;
      //   }
      // }

      if (currentFloorRef.current + 1 > floors) {
        setShowGraffiti(true); // Show graffiti animation
        setTimeout(() => {
          setShowGraffiti(false); // Hide graffiti after 3 seconds
          resetGame();
        }, 3000);
      }
    } else if (box === "bomb") {
      setBobs(true);
      alert("You hit a bomb! Game over.");
      resetGame();
      setIsAutoPlay(false); 

     
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };
  const autoPayhandleBoxSelect = (boxIndex) => {
    const box = boxes[currentFloorRef.current - 1][boxIndex]; 
    const newSelectedBoxes = [...selectedBoxesRef.current]; 
    newSelectedBoxes[currentFloorRef.current - 1] = boxIndex; 
    setSelectedBoxes(newSelectedBoxes); 
    selectedBoxesRef.current = newSelectedBoxes; 

    if (box === "gem") {
      setCurrentFloor((prevFloor) => prevFloor + 1); 
      setPlayerBalance((prev) => prev + 5);

   
      consecutiveGemsRef.current += 1;

    

      if (consecutiveGemsRef.current === 4) {
        setShowGraffiti(true);
        setTimeout(() => {
          setShowGraffiti(false); 
          resetGame();
        }, 3000);
        setIsAutoPlay(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }


      if (currentFloorRef.current + 1 > floors) {
        setShowGraffiti(true); 
        setTimeout(() => {
          setShowGraffiti(false); 
          resetGame();
        }, 3000);
      }
    } else if (box === "bomb") {
      setBobs(true);
      alert("You hit a bomb! Game over.");
      resetGame();
      setIsAutoPlay(false); 

      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    setCurrentFloor(1);
    setBoxes(generateBoxes(difficulty, floors));
    setSelectedBoxes(Array(floors).fill(null)); 
    selectedBoxesRef.current = Array(floors).fill(null); 
    consecutiveGemsRef.current = 0; 
  };


  const handleAutoPlay = (rounds) => {
    setIsAutoPlay(true);
    setAutoPlayRounds(rounds);
    let roundsLeft = rounds;

  
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

   
    intervalRef.current = setInterval(() => {
      if (roundsLeft <= 0 || playerBalance <= 0) {
        clearInterval(intervalRef.current);
        setIsAutoPlay(false);
        console.log("round ended");
        return;
      }

      const boxIndex = Math.floor(
        Math.random() * boxes[currentFloorRef.current - 1].length
      ); 
      autoPayhandleBoxSelect(boxIndex);
      roundsLeft--;
    }, 1000); 
  };

  
  const cancelAutoPlay = () => {
    setIsAutoPlay(false);

  
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handle = (difficultys) => {
    setCurrentFloor(1);
    setDifficulty(difficultys);
    setBoxes(generateBoxes(difficultys, floors));
  };

  useEffect(() => {
    setBoxes(generateBoxes(difficulty, floors));
  }, []);

  return (
    <div>
      {showGraffiti && <Graffiti />}

      <div>
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => handle(e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Impossible">Impossible</option>
        </select>
      </div>
      <div>
        <p>Player Balance: {playerBalance}</p>
        <p>Current Floor: {currentFloor}</p>
      </div>
      <div>
        <button onClick={() => handleAutoPlay(10)}>Auto-Play 10 Rounds</button>
        <button onClick={cancelAutoPlay}>Cancel Auto-Play</button>
      </div>
      <div
        style={{
          border: "1px solid ",
          flexWrap: "wrap ",
        }}
      >
        {boxes.map((floorBoxes, floorIndex) => (
          <Floor
            key={floorIndex}
            floorNumber={floorIndex + 1}
            boxes={floorBoxes}
            isActive={floorIndex + 1 === currentFloor} 
            selectedBox={selectedBoxes[floorIndex]} 
            bobs={isBobs}
            onBoxSelect={
              floorIndex + 1 === currentFloor ? handleBoxSelect : null
            } 
          />
        ))}
      </div>
    </div>
  );
};

export default TowerQuestGame;
