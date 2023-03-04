import React from "react";

const Result = ({ results }) => {
  console.log(results);
  return (
    <div>
      <h3>Results</h3>
      {results.map((el) => {
        return (
          <div className="result-container">
            <div className="result-child">
              <p className="result-prompt">{el.prompt}</p>
            </div>
            <div className="result-child">
              <p>{el.res}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
