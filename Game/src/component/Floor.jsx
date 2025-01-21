import Box from "./Box";

const Floor = ({ floorNumber, boxes, isActive, selectedBox, onBoxSelect ,bobs}) => {
  // console.log("selected box",selectedBox)
  return (
    <div
      style={{
        // marginBottom: "20px",
        // // border: isActive ? "2px solid blue" : "1px solid gray",
        // padding: "10px",
      }}
    >
    
      <div style={{ display: "flex" }}>
        {boxes.map((box, index) => (
          <Box
            key={index}
            content={box}
            isSelected={index === selectedBox} 
            selectedBox={selectedBox}
            bobs={bobs}
            isActive={isActive}
            onSelect={onBoxSelect ? () => onBoxSelect(index) : null} 
          />
        ))}
      </div>
    </div>
  );
};

export default Floor;
