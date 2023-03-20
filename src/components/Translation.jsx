import React from "react";

const Translation = ({ submitPrompt, textRef, isDisabled }) => {
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
        disabled={isDisabled}
      />
      <div className="translation-buttons">
        <button onClick={handleSubmit} disabled={isDisabled}>
          Submit
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Translation;
