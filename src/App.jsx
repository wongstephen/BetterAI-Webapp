import "./App.css";
import { useRef, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Options from "./components/Options";
import Translation from "./components/Translation";
import { arrayItems } from "./aiOptions";
import Result from "./components/Result";

function App() {
  const inputRef = useRef("");
  const textRef = useRef("");
  const [images, setImages] = useState([]);
  const [option, setOption] = useState({});
  const [selectedGrid, setSelectedGrid] = useState("q&a");
  const [results, setResults] = useState([]);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const promptInput = document.querySelector(".prompt-input");

  const fetchImg = async () => {
    if (!inputRef.current.value) {
      console.error("The prompt is empty");
      return;
    }
    try {
      console.log("Generating image for " + inputRef.current.value);
      const res = await openai.createImage({
        prompt: inputRef.current.value,
        n: 1,
        size: "256x256",
      });
      const image_url = res.data.data[0].url;
      setImages((prev) => [...prev, image_url]);
      inputRef = "";
    } catch (err) {
      console.error(err);
    } finally {
      promptInput.value = "";
    }
  };

  const selOption = (option) => {
    setOption((prev) => {
      return { ...prev, ...option };
    });
  };

  const submitPrompt = async () => {
    try {
      const promptStr = option.prompt + textRef.current.value;
      console.log({ ...option, prompt: promptStr });
      const openaiOption = { ...option, prompt: promptStr };
      const response = await openai.createCompletion(openaiOption);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <img className="app-logo" src="/assets/better-ai-logo.png"></img>
      <p>
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
      </div>

      <Options
        arrayItems={arrayItems}
        selOption={selOption}
        setSelectedGrid={setSelectedGrid}
        selectedGrid={selectedGrid}
      />
      <Translation textRef={textRef} submitPrompt={submitPrompt} />
      <Result results={results} />
    </div>
  );
}

export default App;
