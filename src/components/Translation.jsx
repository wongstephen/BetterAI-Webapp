import React from "react";

const Translation = ({ submitPrompt, textRef }) => {
  const handleSubmit = () => {
    submitPrompt();
  };
  const textInput = document.querySelector(".text-area");
  const handleClear = () => {
    textInput.value = "";
  };
  return (
    <div>
      <textarea
        className="text-area"
        ref={textRef}
        rows="10"
        cols="40"
      ></textarea>
      <div className="translation-buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Translation;
