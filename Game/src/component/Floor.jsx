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
      {/* <h3>Floor {floorNumber}</h3> */}
      <div style={{ display: "flex" }}>
        {boxes.map((box, index) => (
          <Box
            key={index}
            content={box}
            isSelected={index === selectedBox} // Pass whether the box is selected
            selectedBox={selectedBox}
            bobs={bobs}
            isActive={isActive} // Pass whether the floor is active
            onSelect={onBoxSelect ? () => onBoxSelect(index) : null} // Only allow selection if the floor is active
          />
        ))}
      </div>
    </div>
  );
};

export default Floor;
