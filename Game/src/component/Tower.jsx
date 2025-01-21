import { useEffect, useState } from "react"

const Tower = () => {
    const [difficulty,setDifficulty]=useState("Normal")
    const [boxes,setBoxes]=useState([])
    const generateBox=(difficulty)=>{
        const floors=8
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
    }
    const handle=(difficultys)=>{
        setDifficulty(difficultys)
        setBoxes(()=>generateBox(difficulty))

    }
    useEffect(()=>{
        //  setDifficulty(difficultys);
         setBoxes( generateBox(difficulty));
    },[])
    // console.log("difficulty",boxes)
  return (
    <div>
          <div>
            <label>Difficulty: </label>
            <select
              value={difficulty}
              onChange={(e) => handle(e.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Impossible">Impossible</option>
            </select>
          </div>
          <div>
            {/* <p>Player Balance: {playerBalance}</p>
            <p>Current Floor: {currentFloor}</p> */}
          </div>
          <div>
            {/* <button onClick={() => handleAutoPlay(10)}>Auto-Play 10 Rounds</button> */}
          </div>
          <div>
            {/* {boxes.map((floorBoxes, floorIndex) => (
              <Floor
                key={floorIndex}
                floorNumber={floorIndex + 1}
                boxes={floorBoxes}
                isActive={floorIndex + 1 === currentFloor}
                onBoxSelect={handleBoxSelect}
              />
            ))} */}
          </div>
        </div>
  )
}

export default Tower
