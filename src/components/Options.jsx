import React from "react";

const Options = ({ arrayItems, selOption, selectedGrid, setSelectedGrid }) => {
  return (
    <div className="grid-options">
      {arrayItems.map((el) => {
        return (
          <div
            className={`grid-child ${
              selectedGrid == el.id && "grid-child-selected"
            }`}
            key={el.id}
            onClick={() => {
              selOption(el.option);
              setSelectedGrid((prev) => {
                {
                  return el.id;
                }
              });
            }}
          >
            <h3>{el.name}</h3>
            <p>{el.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
