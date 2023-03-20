import React from "react";

const Result = ({ results }) => {
  return (
    <div>
      {results.length > 0 && <h3>Results</h3>}
      {results.map((el, idx) => {
        return (
          <div className="result-container" key={idx}>
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
