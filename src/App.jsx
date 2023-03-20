import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Options from "./components/Options";
import Translation from "./components/Translation";
import { arrayItems } from "./aiOptions";
import Result from "./components/Result";

function App() {
  const inputRef = useRef("");
  const textRef = useRef("");
  // const [images, setImages] = useState([]);
  const [option, setOption] = useState({});
  const [selectedGrid, setSelectedGrid] = useState("");
  const [results, setResults] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const promptInput = document.querySelector(".prompt-input");

  useEffect(() => {
    selectedGrid && setIsDisabled(() => false);
  }, [selectedGrid]);

  // const fetchImg = async () => {
  //   if (!inputRef.current.value) {
  //     console.error("The prompt is empty");
  //     return;
  //   }
  //   try {
  //     console.log("Generating image for " + inputRef.current.value);
  //     console.log(inputRef.current);
  //     const res = await openai.createImage({
  //       prompt: inputRef.current.value,
  //       n: 1,
  //       size: "256x256",
  //     });
  //     const image_url = res.data.data[0].url;
  //     setImages((prev) => [...prev, image_url]);
  //     inputRef = "";
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     promptInput.value = "";
  //   }
  // };

  const selOption = (option) => {
    setOption((prev) => {
      return { ...prev, ...option };
    });
  };

  const submitPrompt = async () => {
    if (!textRef.current.value || Object.keys(option) === 0) {
      console.error("Select a translation or enter a prompt");
      return;
    }
    setIsDisabled(() => true);
    try {
      const promptStr = option.prompt
        ? option.prompt + textRef.current.value
        : textRef.current.value;
      // const response = "top speed is 140";
      // console.log({ ...option, prompt: promptStr });
      const openaiOption = { ...option, prompt: promptStr };
      const response = await openai.createCompletion(openaiOption);
      setResults((prev) => {
        return [
          ...prev,
          { prompt: promptStr, res: response.data.choices[0].text },
        ];
      });
      console.log(response.data.choices[0].text);
    } catch (err) {
      console.log(err);
    } finally {
      setIsDisabled(() => false);
    }
  };

  return (
    <div className="App">
      <img className="app-logo" src="/assets/logo.png"></img>
      {/* <p>
        Better AI uses artificial intelligence to generate custom images based
        on your prompt.
        <br />
        Enter your prompt and get a unique image in seconds.
      </p>
      <form>
        <label htmlFor="prompt" className="visually-hidden">
          Enter a prompt
        </label>
        <textarea
          name="prompt"
          placeholder="Your prompt"
          ref={inputRef}
          rows="5"
          className="prompt-input"
        ></textarea>
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchImg();
          }}
        >
          Generate
        </button>
      </form>
      <div className="image-container">
        {images.length > 0 &&
          images.map((url) => {
            return <img src={url} key={url} />;
          })}
      </div> */}

      <h3>1. To get started, select a prompt. </h3>
      <Options
        arrayItems={arrayItems}
        selOption={selOption}
        setSelectedGrid={setSelectedGrid}
        selectedGrid={selectedGrid}
      />
      <h3>
        2. Enter the parameters for your prompt. Then click submit to generate
        results.
      </h3>
      <Translation
        textRef={textRef}
        submitPrompt={submitPrompt}
        isDisabled={isDisabled}
      />
      <Result results={results} />
    </div>
  );
}

export default App;
